import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIndividualLakeData } from '../../services/individualLakeService'
import ImageModal from '../../components/DialogBox/imageDialog';

interface Image {
    uri: string;
    latitude: number;
    longitude: number;
}

interface Question {
    question: string;
    answer: string;
    images: Image[];
}


const IndividualLakeDetails: React.FC<any> = () => {

    const { id } = useParams();
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState<Image[]>([]);
    const [initialIndex, setInitialIndex] = useState(0);

    const openModal = (images: Image[], index: number) => {
        console.log('Images:', images);
        setModalImages(images);
        setInitialIndex(index);
        setModalOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lakeDetails = await getIndividualLakeData(id);
                console.log('Lake Details:', lakeDetails);
                setData(lakeDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error loading lake details:', error);
            }
        };
        fetchData();
    }, [id]);
    return (
        <div className="p-6">
            {loading && <p>Loading...</p>}
            {!loading && data && (
                <div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{`MADAI - ${data.madai ? data.madai : ''}`}</h2>
                        <h3 className="text-xl mb-4">{`Lake Name: ${data.lakeName}`}</h3>
                    </div>


                    <div>
                        {data.questions.map((question: { question: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; answer: any; images: any[]; }, index: React.Key | null | undefined) => (
                            <div key={index} className="mb-4 border-b pb-2 flex justify-evenly items-center">
                                <div>
                                    <h4 className="font-semibold">{question.question}</h4>
                                    <p>{`Answer: ${question.answer}`}</p>
                                </div>
                                <div>
                                    {question.images && question.images.length > 0 ? (
                                        question.images.map((img, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={img.uri}
                                                alt={`Question Image ${imgIndex + 1}`}
                                                className="w-32 h-32 object-cover mt-2 cursor-pointer"
                                                onClick={() => openModal(question.images, imgIndex)}
                                            />
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ImageModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        images={modalImages}
                        initialIndex={initialIndex}
                    />

                    <p className="mt-4 text-sm text-gray-500">{`Uploaded by: ${data.userId}`}</p>
                </div>
            )}
        </div>


    );
};

export default IndividualLakeDetails;
