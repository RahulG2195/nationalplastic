"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { notifyError } from '@/utils/notify';

const YouTubeCMS = () => {
    const router = useRouter();
    const [youtubeData, setYoutubeData] = useState([]);
    const [filteredYoutubeData, setFilteredYoutubeData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/YouTubeCMS`);
            const { results } = rawData.data;
            setYoutubeData(results);
            setFilteredYoutubeData(results);
        };
        fetchData();
    }, []);

    const handleOnclick = (id) => {
        const videoToEdit = youtubeData.find(item => item.id === id);
        localStorage.setItem('videoToEdit', JSON.stringify(videoToEdit));
        router.push("/admin/YouTubeEditor"); // Make sure you have a YouTubeEditor page for editing content
    };

    const handleThumbnailUpdate = async (id, file) => {
        const formData = new FormData();
        formData.append('thumbnail', file);
        formData.append('id', id);

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/YouTubeCMS`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Thumbnail updated: ", response.data);
            // Optionally, refresh data after successful upload
        } catch (error) {
            notifyError('Error uploading thumbnail');
            console.error("Error uploading thumbnail", error);
        }
    };

    const columns = [
        {
            title: 'Index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Video Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ),
        },
        {
            title: 'YouTube URL',
            dataIndex: 'url',
            key: 'url',
            render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>,
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail) => thumbnail ?
                <Image src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_THUMBNAILS_PATH_DIR}${thumbnail}`} alt="Thumbnail" width={100} height={100} /> :
                <span>Not uploaded</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleOnclick(record.id)} color="primary">
                        Edit Video
                    </Button>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id={`upload_thumbnail_${record.id}`}
                        onChange={(e) => handleThumbnailUpdate(record.id, e.target.files[0])}
                    />
                    <Button
                        color="secondary"
                        onClick={() => document.getElementById(`upload_thumbnail_${record.id}`).click()}
                        className="ml-2"
                    >
                        Update Thumbnail
                    </Button>
                </>
            ),
        },
    ];

    return (
        <Container fluid>
            <h1 className="my-4">YouTube Video Management</h1>
            <Table
                columns={columns}
                dataSource={filteredYoutubeData.map(item => ({ ...item, key: item.id }))}
            />
        </Container>
    );
}

export default YouTubeCMS;
