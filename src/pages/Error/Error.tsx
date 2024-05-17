import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error : { [k:string]: string | number | boolean | [] | undefined | null } = useRouteError() as { [k:string]: string | number | boolean | [] | undefined | null };
  const message = error.statusText === "Not Found" ? "Page non trouvée" : error.statusText;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Désolé, une erreur s'est produite</p>
      <p>
        <i>
          {error.status}
          {" "}
          {message}
        </i>
      </p>
    </div>
  );
}
