import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { CATEGORIES, CategoryType, PostProps } from 'components/PostList';

export default function PostForm() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('Frontend');
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
          category: category,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        });

        toast.success('게시글을 수정했습니다.');
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, 'posts'), {
          title: title,
          category: category,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { value, name },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'category') {
      setCategory(value as CategoryType);
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
      setCategory(post.category as CategoryType);
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
        <label htmlFor='category'>카테고리</label>
        <select
          name='category'
          id='category'
          onChange={onChange}
          defaultValue={category}
        >
          <option value=''>카테고리를 선택해주세요</option>
          {CATEGORIES?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
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
        <label htmlFor='content'>내용</label>
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
