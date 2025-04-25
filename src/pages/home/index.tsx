import Header from 'components/Header';
import PostList from 'components/PostList';
import Footer from 'components/Footer';
import Carousel from 'components/Carousel';

export default function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <PostList hasNavigation={true} />
      <Footer />
    </>
  );
}
