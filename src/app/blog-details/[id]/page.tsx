import BlogDetailsMain from "@/components/blog-details/BlogDetailsMain";

import Wrapper from "@/layout/DefaultWrapper";

type Params = Promise<{ id: number }>;

const BlogDetailsDynamic = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <>
      <Wrapper>
        <main>
          <BlogDetailsMain id={id} />
        </main>
      </Wrapper>
    </>
  );
};

export default BlogDetailsDynamic;
