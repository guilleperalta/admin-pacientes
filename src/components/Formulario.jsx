import { useState, useEffect } from 'react';
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [trabajo, setTrabajo] = useState('');

    const [error, setError] = useState(false)

    useEffect(() => {
        if( Object.keys(paciente).length > 0  ) {
            setNombre(paciente.nombre)
            setTelefono(paciente.telefono)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setTrabajo(paciente.trabajo)
        }
    }, [paciente])


    

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del Formulario
        if( [ nombre, email, fecha, trabajo ].includes('') ) {
            console.log('Hay Al Menos un campo vacio')

            setError(true)
            return;
        } 
        
        setError(false)


        // Objeto de Paciente
        const objetoPaciente = {
            nombre,
            telefono,
            email,
            fecha,
            trabajo
        }

        if(paciente.id) {
            // Editando el Registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

            setPacientes(pacientesActualizados)
            setPaciente({})

        } else {
            // Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        // Reiniciar el form
        setNombre('')
        setTelefono('')
        setEmail('')
        setFecha('')
        setTrabajo('')

    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold ">Administralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                { error &&  <Error><p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre y Apellido
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre y Apellido"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Teléfono
                    </label>
                    <input
                        id="telefono"
                        type="number"
                        placeholder="Telefono celular"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={telefono}
                        onChange={ (e) => setTelefono(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Contacto"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Fecha de visita
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Trabajo que se realizo
                    </label>
                    <textarea 
                        id="trabajo"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los trabajos que se realizaron"
                        value={trabajo}
                        onChange={ (e) => setTrabajo(e.target.value) }
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
                />
            </form>
        </div>
    )
}

export default Formulario
