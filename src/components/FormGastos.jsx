import { useState, useEffect } from 'react';

const FormGastos = ({ agregarSeguimiento, setMensaje, gastoEditando }) => {
    const [nombreGasto, setNombreGasto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');

    useEffect(() => {
        if (gastoEditando) {
            setNombreGasto(gastoEditando.nombreGasto);
            setDescripcion(gastoEditando.descripcion);
            setCategoria(gastoEditando.categoria);
            setMonto(gastoEditando.monto);
        } else {
            setNombreGasto('');
            setDescripcion('');
            setCategoria('');
            setMonto('');
        }
    }, [gastoEditando]);

    const valDatos = (vali) => {
        vali.preventDefault();

        if (nombreGasto.trim() === '' || descripcion.trim() === '' || categoria.trim() === '' || monto.trim() === '') {
            setMensaje('Todos los campos son obligatorios');
            return;
        }
        const nombreFormateado = nombreGasto.charAt(0).toUpperCase() + nombreGasto.slice(1);

        const nombreGastoRegex = /^[ÁÉÍÓÚA-Z][a-zA-ZáéíóúÁÉÍÓÚ\s]*$/;
        if (!nombreGastoRegex.test(nombreFormateado)) {
            setMensaje('El nombre del gasto solo contener letras y espacios');
            return;

        }
        const descripcionRegex = /^.{5,}$/;
        if (!descripcionRegex.test(descripcion)) {
            setMensaje('La descripción debe tener al menos 5 caracteres');
            return;
        }
        const categoriasPermitidas = [
            'Gastos de alimentación',
            'Gastos de vivienda',
            'Gastos de transporte',
            'Gastos de educación',
            'Gastos de salud',
            'Gastos de ocio',
            'Gastos de ahorro e inversión'
        ];
        if (!categoriasPermitidas.includes(categoria)) {
            setMensaje('Selecciona una categoría válida');
            return;
        }
        const montoRegex = /^[1-9]\d*(\.\d{1,2})?$/;
        if (!montoRegex.test(monto)) {
            setMensaje('El monto debe ser un número entero o decimal con dos decimales');
            return;
        }

        agregarSeguimiento(nombreFormateado, descripcion, categoria, monto);

        setNombreGasto('');
        setDescripcion('');
        setCategoria('');
        setMonto('');

        setMensaje('Gasto agregado');
    };

    return (
        <form onSubmit={valDatos}>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Nombre del Gasto</label>
                    <input type="text" className="form-control" value={nombreGasto} onChange={(vali) => setNombreGasto(vali.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(vali) => setDescripcion(vali.target.value)} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
                        <option value="">Selecciona una categoría</option>
                        <option value="Gastos de alimentación">Gastos de alimentación</option>
                        <option value="Gastos de vivienda">Gastos de vivienda</option>
                        <option value="Gastos de transporte">Gastos de transporte</option>
                        <option value="Gastos de educación">Gastos de educación</option>
                        <option value="Gastos de salud">Gastos de salud</option>
                        <option value="Gastos de ocio">Gastos de ocio</option>
                        <option value="Gastos de ahorro e inversión">Gastos de ahorro e inversión</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Monto</label>
                    <input type="text" className="form-control" value={monto} onChange={(vali) => setMonto(vali.target.value)} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Agregar Gasto</button>
        </form>
    );
};

export default FormGastos;
