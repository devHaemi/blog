import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = 'all' | 'my';

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <>
      {hasNavigation && (
        <div className='post__navigation'>
          <div
            role='presentation'
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post__navigation--active' : ''}
          >
            전체
          </div>
          <div
            role='presentation'
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post__navigation--active' : ''}
          >
            나의 글
          </div>
        </div>
      )}
      <div className='post__list'>
        {[...Array(10)].map((e, index) => (
          <div key={index} className='post__box'>
            <Link to={`posts/${index}`}>
              <div className='post__profile-box'>
                <div className='post__profile' />
                <div className='post__author-name'>패스트캠퍼스</div>
                <div className='post__date'>2023.07.08 토요일</div>
              </div>
              <div className='post__title'>게시글 {index}</div>
              <div className='post__text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis facilis amet ipsum maiores, explicabo laboriosam veniam
                ullam placeat ratione. Magnam earum, ex impedit culpa veniam
                minus accusantium amet quos reiciendis quibusdam doloribus odit
                obcaecati atque natus, sed sit omnis, maxime quas tenetur velit
                nesciunt et dolores! Fugiat eaque, iure eos magni at deleniti
                tenetur reiciendis et odio tempore minus adipisci quos
                praesentium enim provident omnis officiis labore quaerat?
                Aperiam, itaque laudantium. Numquam perferendis eligendi
                molestias reprehenderit iste, itaque quibusdam. Velit, cum? At
                illo rem explicabo beatae, commodi consectetur? Eum odio earum,
                ipsum aliquam laudantium nemo labore similique eius consequatur
                blanditiis explicabo perspiciatis dignissimos ullam quidem
                temporibus officiis quibusdam sunt atque nisi nam minus quae
                doloribus quod repellendus? Fugiat aspernatur voluptas laborum
                tempore, totam, tempora sit soluta nesciunt eaque nemo tenetur
                quo obcaecati officiis, ullam inventore a quis sapiente! Sint,
                laudantium modi. Natus repellat dicta quod impedit consequuntur
                distinctio excepturi beatae provident ab assumenda, obcaecati
                facilis molestiae iure ullam quia alias esse sunt perspiciatis
                dignissimos aliquid ipsum! Rem labore neque totam harum ipsa
                quas minus, et, doloremque debitis animi, voluptate explicabo?
                Voluptatum porro, incidunt repellendus, a non necessitatibus hic
                rem cupiditate dolores sequi harum saepe. Non et minus unde
                natus repellat?
              </div>
              <div className='post__utils-box'>
                <div className='post__delete'>삭제</div>
                <div className='post__edit'>수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
