import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}
const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  return (
    <div>
      <Container>
        <Title>Single Blog Page</Title>
        <p>{slug}</p>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
