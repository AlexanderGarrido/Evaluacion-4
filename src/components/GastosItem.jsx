
const GastosItem = ({ gasto, cambiarEstado, eliminarGasto, editarGasto }) => {
    const { id, nombreGasto, descripcion, categoria, monto, fecha, estado } = gasto;

    return (
        <div className="col-sm-6 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{nombreGasto}</h5>
                    <p className="card-text">
                        <strong>Descripción:</strong> {descripcion}<br />
                        <strong>Categoría:</strong> {categoria}<br />
                        <strong>Monto:</strong> {monto}<br />
                        <strong>Fecha:</strong> {fecha}<br />
                        <strong>Estado:</strong> {estado ? 'Completado' : 'Pendiente'}
                    </p>
                    <div className="button-group">
                        <button className="btn btn-primary me-2 mb-2" onClick={() => editarGasto(id)}>Editar</button>
                        <button className="btn btn-danger me-2 mb-2" onClick={() => eliminarGasto(id)}>Eliminar</button>
                        <button className="btn btn-success mb-2" onClick={() => cambiarEstado(id)}>
                            {estado ? 'Marcar como Pendiente' : 'Marcar como Completado'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GastosItem;
