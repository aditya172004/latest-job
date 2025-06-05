import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
const JobCard = ({ job }) => {
    const navigate = useNavigate();

    // Function to get complete sentences within a character limit
    const getCompleteSentences = (text, limit) => {
        if (!text) return '';
        
        // Strip HTML tags
        const strippedText = text.replace(/<[^>]*>/g, '');
        
        // If text is shorter than limit, return it
        if (strippedText.length <= limit) return strippedText;
        
        // Find the sentence endings within the limit
        const truncated = strippedText.slice(0, limit);
        const sentences = truncated.match(/[^.!?]+[.!?]+/g) || [];
        
        // If no sentences found, return truncated text with ellipsis
        if (sentences.length === 0) return truncated + '...';
        
        // If first sentence is very short (less than 50 chars) and there's a second sentence
        if (sentences[0].length < 100 && sentences.length > 1) {
            return sentences[0] + sentences[1];
        }
        
        // Otherwise return the first sentence
        return sentences[0];
    };

    return (
        <div className='border p-6 shadow rounded'>
            <div className='flex justify-between items-center'>
                <img className='h-8' src={job.companyId.image} alt="" />
            </div>
            <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
            <div className='flex items-center gap-3 mt-2 text-xs'>
                <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
                <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
            </div>
            <p className='text-gray-500 text-sm mt-4'>
                {getCompleteSentences(job.description, 250)}
            </p>
            <div className='mt-4 flex gap-4 text-sm'>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-blue-600 text-white px-4 py-2 rounded'>Apply now</button>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn more</button>
            </div>
        </div>
    )
}

export default JobCard