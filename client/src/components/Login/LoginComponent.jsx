import LoginImageBackground from "./LoginImageBackground";
import LoginMainForm from "./LoginMainForm";

function LoginComponent() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2 xl:grid-cols-3">
      <LoginImageBackground />
      <LoginMainForm />
    </div>
  );
}

export default LoginComponent;
