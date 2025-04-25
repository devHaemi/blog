import { Link } from 'react-router-dom';

export default function PostDetail() {
  return (
    <>
      <div className='post__detail'>
        <div className='post__box'>
          <div className='post__title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
          <div className='post__profile-box'>
            <div className='post__profile' />
            <div className='post__author-name'>패스트캠퍼스</div>
            <div className='post__date'>2023.07.08 토요일</div>
          </div>
          <div className='post__utils-box'>
            <div className='post__delete'>삭제</div>
            <div className='post__edit'>
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
          </div>
          <div className='post__text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            facilis amet ipsum maiores, explicabo laboriosam veniam ullam
            placeat ratione. Magnam earum, ex impedit culpa veniam minus
            accusantium amet quos reiciendis quibusdam doloribus odit obcaecati
            atque natus, sed sit omnis, maxime quas tenetur velit nesciunt et
            dolores! Fugiat eaque, iure eos magni at deleniti tenetur reiciendis
            et odio tempore minus adipisci quos praesentium enim provident omnis
            officiis labore quaerat? Aperiam, itaque laudantium. Numquam
            perferendis eligendi molestias reprehenderit iste, itaque quibusdam.
            Velit, cum? At illo rem explicabo beatae, commodi consectetur? Eum
            odio earum, ipsum aliquam laudantium nemo labore similique eius
            consequatur blanditiis explicabo perspiciatis dignissimos ullam
            quidem temporibus officiis quibusdam sunt atque nisi nam minus quae
            doloribus quod repellendus? Fugiat aspernatur voluptas laborum
            tempore, totam, tempora sit soluta nesciunt eaque nemo tenetur quo
            obcaecati officiis, ullam inventore a quis sapiente! Sint,
            laudantium modi.
          </div>
        </div>
      </div>
    </>
  );
}
