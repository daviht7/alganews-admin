import { Avatar, Card, Col, Row } from 'antd';
import { useEffect } from 'react';
import useLatestPosts from '../../core/hooks/useLatestPosts';
export default function LatestPosts() {
  const { fetchPosts, posts } = useLatestPosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Row gutter={16}>
      {posts?.map((post) => {
        return (
          <Col xs={24} md={8}>
            <Card
              key={post.id}
              cover={
                <img
                  alt={post.title}
                  src={post.imageUrls.small}
                  style={{
                    height: 168,
                    objectFit: 'cover',
                  }}
                />
              }
            >
              <Card.Meta
                title={post.title}
                avatar={
                  <Avatar
                    src={post.editor.avatarUrls.small}
                  />
                }
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
