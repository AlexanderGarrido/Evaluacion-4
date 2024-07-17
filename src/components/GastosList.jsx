import { Fragment, useState, useEffect } from 'react';
import GastosItem from './GastosItem';
import FormGastos from './FormGastos';

import uuid4 from "uuid4";

const GastosList = () => {
  const [gastos, setGastos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoGasto, setEditandoGasto] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gastosPorPagina] = useState(6);

  const agregarSeguimiento = (nombreGasto, descripcion, categoria, monto) => {
    if (editandoGasto) {
      const actualizarGastos = gastos.map(gasto =>
        gasto.id === editandoGasto.id
          ? { ...gasto, nombreGasto, descripcion, categoria, monto }
          : gasto
      );
      setGastos(actualizarGastos);
      setEditandoGasto(null);
      setMensaje("Gasto editado correctamente");
    } else {
      const nuevoGasto = {
        id: uuid4(),
        nombreGasto,
        descripcion,
        categoria,
        monto,
        fecha: new Date().toLocaleDateString(),
        estado: false,
      };
      setGastos((prevGastos) => [...prevGastos, nuevoGasto]);
      setMensaje("Gasto agregado correctamente");
    }
    setTimeout(() => {
      setMensaje("")
    }, 3000)
  };

  const filtrarGastos = (event) => {
    setFiltro(event.target.value);
  };

  const cambiarEstadoSeguimiento = (id) => {
    const nuevosGastos = [...gastos];
    const gasto = nuevosGastos.find((gasto) => gasto.id === id);
    gasto.estado = !gasto.estado;
    setGastos(nuevosGastos);
  };

  const eliminarSeguimiento = (id) => {
    const nuevosGastos = gastos.filter((gasto) => gasto.id !== id);
    setGastos(nuevosGastos);
    setMensaje("Gasto eliminado correctamente");
    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };

  const ordenarPorNombre = () => {
    const gastosOrdenados = [...gastos].sort((a, b) => {
      if (a.nombreGasto < b.nombreGasto) return -1;
      if (a.nombreGasto > b.nombreGasto) return 1;
      return 0;
    });
    setGastos(gastosOrdenados);
  };

  function contarSeguimientos() {
    return gastos.filter((gasto) => !gasto.estado).length;
  }

  const ResumenSeguimientos = () => {
    const cantidad = contarSeguimientos();
    return (
      <div className="alert alert-warning mt-3 text-center">
        Tienes {cantidad} Gastos en Seguimiento.
      </div>
    )
  }

  /* LocalStorage */
  const KEY = 'gastos';
  useEffect(() => {
    const storedGastos = JSON.parse(localStorage.getItem(KEY));
    if (storedGastos) setGastos(storedGastos);
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(gastos));
  }, [gastos])

  const indexOfUltimoGasto = currentPage * gastosPorPagina;
  const indexOfPrimerGasto = indexOfUltimoGasto - gastosPorPagina;
  const gastosActuales = gastos.slice(indexOfPrimerGasto, indexOfUltimoGasto);

  const totalPages = Math.ceil(gastos.length / gastosPorPagina);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <div className="container mt-5 bg-info-subtle">
        <h1 className="display-5 text-center">Seguimiento de Gastos 💲</h1>
        <br />
        <div className="row justify-content-center">
          <div className="col-md-10">
            <FormGastos agregarSeguimiento={agregarSeguimiento} setMensaje={setMensaje} gastoEditando={editandoGasto} />
            <br />
            {mensaje && <div className="alert alert-success">{mensaje}</div>}
            <br />
            <div className="mb-3">
              <label className="form-label">Buscar Gasto</label>
              <input
                type="text"
                className="form-control"
                value={filtro}
                onChange={filtrarGastos}
                placeholder="Buscar por nombre, descripción, categoría o monto"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h2>Lista de Gastos</h2>
              <ResumenSeguimientos />
              <div className="d-grid gap-2 ms-3">
                <button className="btn btn-outline-primary btn-sm" onClick={ordenarPorNombre}>
                  Ordenar por Nombre
                </button>
              </div>
            </div>
            <div className="row">
              {gastosActuales
                .filter((gasto) => {
                  return (
                    gasto.nombreGasto.toLowerCase().includes(filtro.toLowerCase()) ||
                    gasto.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
                    gasto.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
                    gasto.monto.toString().includes(filtro.toLowerCase()) ||
                    gasto.fecha.toString().includes(filtro.toLowerCase())
                  );
                })
                .map((gasto) => (
                  <GastosItem key={gasto.id} gasto={gasto} cambiarEstado={cambiarEstadoSeguimiento} eliminarGasto={eliminarSeguimiento} editarGasto={() => setEditandoGasto(gasto)} />
                ))}
            </div>
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <button onClick={() => paginate(number)} className="page-link">
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GastosList;
