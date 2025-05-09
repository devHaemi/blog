import { Link } from 'react-router-dom';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import { useContext } from 'react';

import ThemeContext from 'context/ThemeContext';

export default function Footer() {
  // react v19 타입 호환 이슈 임시방편
  const SunIcon = BsSun as any;
  const MoonIcon = BsMoonFill as any;

  const context = useContext(ThemeContext);

  console.log(context);

  return (
    <footer>
      <Link to='/posts/new'>글쓰기</Link>
      <Link to='/posts'>게시글</Link>
      <Link to='/profile'>프로필</Link>
      <>
        {context.theme === 'light' ? (
          <SunIcon onClick={context.toggleMode} className='footer__theme-btn' />
        ) : (
          <MoonIcon
            onClick={context.toggleMode}
            className='footer__theme-btn'
          />
        )}
      </>
    </footer>
  );
}
