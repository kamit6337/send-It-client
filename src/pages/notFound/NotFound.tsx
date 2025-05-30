import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="messages" content="Not Found page of this project" />
      </Helmet>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="space-y-3">
          <p className="font-semibold text-lg tracking-wide">
            404 - Not found Page
          </p>
          <p>
            Go back to
            <span className="underline underline-offset-2 p-1">
              <Link to={`/`}>Home</Link>
            </span>
            page
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFound;
