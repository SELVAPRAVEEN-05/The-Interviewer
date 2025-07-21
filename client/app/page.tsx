import Login from "./login/login";
import backgroundImage from "../components/assets/canva.png";

export default function Page() {
  return (
    <div
      className="flex items-center justify-end h-screen p-6  bg-no-repeat  bg-cover"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <Login />
    </div>
  );
}
