import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';


function Page404(): JSX.Element {
  return(
    <>
      <Helmet>
        <title>6 sities: page not found</title>
      </Helmet>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </>
  );
}

export default Page404;
