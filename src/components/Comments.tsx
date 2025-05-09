import { PostProps } from 'components/PostList';
import AuthContext from 'context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

const COMMENTS = [
  {
    id: 1,
    email: 'dfsdf@gmail.com',
    createdAt: '2025.5.9',
    content: '코멘트 테스트',
  },
];

interface CommentProps {
  post: PostProps;
}

export default function Comments({ post }: CommentProps) {
  const [comment, setComment] = useState<string>('');
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObj = {
            comment: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };

          await updateDoc(postRef, {
            comment: commentObj,
            updatedAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='comments'>
      <form className='comments__form' onSubmit={onSubmit}>
        <div className='form__block'>
          <label htmlFor='comment'>댓글 입력</label>
          <textarea
            name='comment'
            id='comment'
            required
            value={comment}
            onChange={onChange}
          ></textarea>
        </div>
        <div className='form__block form__block-reverse'>
          <input type='submit' value='입력' className='form__btn-submit' />
        </div>
      </form>
      <div className='comments__list'>
        {COMMENTS.map((comment) => (
          <div key={comment.id} className='comment__box'>
            <div className='comment__profile-box'>
              <div className='comment__email'>{comment.email}</div>
              <div className='comment__date'>{comment.createdAt}</div>
              <div className='comment__delete'>삭제</div>
            </div>
            <div className='comment__text'>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
