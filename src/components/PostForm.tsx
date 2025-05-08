import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { PostProps } from 'components/PostList';

export default function PostForm() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString(),
        });

        toast.success('게시글을 수정했습니다.');
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, 'posts'), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });

        toast.success('게시글을 생성했습니다.');
        navigate('/');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value, name },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'summary') {
      setSummary(value);
    }

    if (name === 'content') {
      setContent(value);
    }
  };

  const getPost = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const DocSnap = await getDoc(docRef);

    setPost({ id: DocSnap?.id, ...(DocSnap.data() as PostProps) });
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
    }
  }, [post]);

  return (
    <form className='form' onSubmit={onSubmit}>
      <div className='form__block'>
        <label htmlFor='title'>제목</label>
        <input
          type='text'
          name='title'
          id='title'
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='summary'>요약</label>
        <input
          type='text'
          name='summary'
          id='summary'
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='content'>요약</label>
        <textarea
          name='content'
          id='content'
          required
          onChange={onChange}
          value={content}
        />
      </div>
      <div className='form__block'>
        <input
          type='submit'
          value={post ? '수정' : '제출'}
          className='form__btn--submit'
        />
      </div>
    </form>
  );
}
