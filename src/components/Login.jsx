import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";

// 🔥 Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebas/Config";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ruta a la que quería ir antes del login (admin)
  const from = location.state?.from?.pathname || "/";

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      console.log("Usuario logueado:", userCredential.user);
      message.success("Inicio de sesión exitoso");

      // 👉 REDIRECCIÓN CORRECTA
      navigate(from, { replace: true });

    } catch (error) {
      console.error(error);
      message.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="form-container">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Por favor ingrese su email!" },
            { type: "email", message: "Ingrese un email válido" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor ingrese su contraseña!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recordarme</Checkbox>
            </Form.Item>
            <a href="#">Olvidé contraseña</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          O <Link to="/registro"> Registrarse</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;


