import React, { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebas/Config'; // Importamos db desde tu config.js

export default function FirestoreCRUD() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(null);
  
  // Formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: ''
  });

  // ==================== CREATE ====================
  const crearUsuario = async () => {
    if (!formData.nombre || !formData.email || !formData.edad) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    setLoading(true);
    
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre: formData.nombre,
        email: formData.email,
        edad: parseInt(formData.edad),
        fechaCreacion: new Date()
      });
      
      console.log("Usuario creado con ID:", docRef.id);
      
      // Limpiar formulario
      setFormData({ nombre: '', email: '', edad: '' });
      
      // Recargar lista
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error al crear usuario: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== READ ====================
  const obtenerUsuarios = async () => {
    setLoading(true);
    
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const usuariosArray = [];
      
      querySnapshot.forEach((doc) => {
        usuariosArray.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setUsuarios(usuariosArray);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      alert("Error al obtener usuarios: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener usuarios en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "usuarios"),
      (snapshot) => {
        const usuariosArray = [];
        snapshot.forEach((doc) => {
          usuariosArray.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setUsuarios(usuariosArray);
      },
      (error) => {
        console.error("Error en tiempo real:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // ==================== UPDATE ====================
  const actualizarUsuario = async () => {
    if (!editando) return;
    if (!formData.nombre || !formData.email || !formData.edad) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    setLoading(true);
    
    try {
      const docRef = doc(db, "usuarios", editando);
      await updateDoc(docRef, {
        nombre: formData.nombre,
        email: formData.email,
        edad: parseInt(formData.edad),
        fechaActualizacion: new Date()
      });
      
      console.log("Usuario actualizado");
      
      // Limpiar formulario y estado de edición
      setFormData({ nombre: '', email: '', edad: '' });
      setEditando(null);
      
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar usuario: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Preparar edición
  const prepararEdicion = (usuario) => {
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      edad: usuario.edad.toString()
    });
    setEditando(usuario.id);
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setFormData({ nombre: '', email: '', edad: '' });
    setEditando(null);
  };

  // ==================== DELETE ====================
  const eliminarUsuario = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    setLoading(true);
    
    try {
      await deleteDoc(doc(db, "usuarios", id));
      console.log("Usuario eliminado");
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar usuario: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editando) {
      actualizarUsuario();
    } else {
      crearUsuario();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          🔥 CRUD Firestore
        </h1>
        <p className="text-center text-gray-600 mb-8">React + Vite + Firebase</p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editando ? '✏️ Editar Usuario' : '➕ Crear Nuevo Usuario'}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="number"
                name="edad"
                placeholder="Edad"
                value={formData.edad}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition font-medium"
              >
                {loading ? '⏳ Procesando...' : editando ? '💾 Actualizar' : '✨ Crear'}
              </button>
              
              {editando && (
                <button
                  onClick={cancelarEdicion}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-medium"
                >
                  ❌ Cancelar
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            👥 Lista de Usuarios ({usuarios.length})
          </h2>
          
          {usuarios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-2">📭 Sin usuarios</p>
              <p className="text-gray-500 text-sm">Crea el primero usando el formulario de arriba</p>
            </div>
          ) : (
            <div className="space-y-3">
              {usuarios.map((usuario) => (
                <div
                  key={usuario.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {usuario.nombre}
                      </h3>
                      <p className="text-gray-600">📧 {usuario.email}</p>
                      <p className="text-sm text-gray-500">🎂 {usuario.edad} años</p>
                      <p className="text-xs text-gray-400 mt-1 font-mono">
                        ID: {usuario.id}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => prepararEdicion(usuario)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
                      >
                        ✏️ Editar
                      </button>
                      
                      <button
                        onClick={() => eliminarUsuario(usuario.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-green-800 mb-3 text-lg">✅ Configuración Lista</h3>
          <div className="text-sm text-green-700 space-y-2">
            <p>• Usando tu archivo <code className="bg-green-100 px-2 py-1 rounded font-mono">config.js</code></p>
            <p>• Base de datos: <strong>anablander-e8418</strong></p>
            <p>• Actualizaciones en tiempo real activadas</p>
            <p>• Todas las operaciones CRUD funcionando</p>
          </div>
        </div>
      </div>
    </div>
  );
}