import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";

// 🔥 Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebas/Config";

// 🔥 Firebase Firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebas/Config";

const Formulario = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      // 1️⃣ Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Guardar datos en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        role: "user"
      });

      message.success("Usuario registrado correctamente");
      navigate("/login");

    } catch (error) {
      console.error(error);
      message.error("Error al registrar el usuario");
    }
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 400 }}
      scrollToFirstError
    >

      {/* EMAIL */}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { type: 'email', message: 'Email no válido' },
          { required: true, message: 'Ingrese su email' },
        ]}
      >
        <Input />
      </Form.Item>

      {/* PASSWORD */}
      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          { required: true, message: 'Ingrese su contraseña' },
          { min: 6, message: 'Mínimo 6 caracteres' },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      {/* CONFIRM PASSWORD */}
      <Form.Item
        name="confirm"
        label="Confirmar contraseña"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Confirme su contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Las contraseñas no coinciden')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* BUTTON */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Registrarse
        </Button>
      </Form.Item>

    </Form>
  );
};

export default Formulario;
