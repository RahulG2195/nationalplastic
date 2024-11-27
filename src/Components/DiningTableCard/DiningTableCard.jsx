import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Paragraph } = Typography;

const DiningTableCard = ({ content, imageUrl }) => {
    // Sanitize HTML content to prevent XSS
    const sanitizedContent = content

    return (
        <Link href="/BlogDetails" className="d-block text-decoration-none">
            <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%' // 16:9 Aspect Ratio
            }}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${imageUrl}` || "/path/to/default/image.jpg"}
                    alt="Blog Featured Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </div>
            {/* <div className="mt-3">
                <Paragraph
                    ellipsis={{ rows: 3 }}
                    style={{ color: '#333' }}
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                </Paragraph>
            </div> */}
        </Link>
    );
}

export default DiningTableCard;