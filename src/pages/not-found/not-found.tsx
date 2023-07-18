import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


function Page404(): JSX.Element {
  return(
    <>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </>
  );
}

export default Page404;
