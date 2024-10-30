import React, {useEffect, useState} from 'react';
import { getDashboardData, getDashboardDataFilter } from '../../services/dashboardService';
import LakeDetails from '../../components/LakeDetails/LakeDetails';
import Pagination from '../../components/Pagination/Pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface Lake {
    _id: string;
    date: string;
  }
const Dashboard: React.FC = () => {
    const [data, setData] = useState<any [] | null >(null);
    const [ loading, setLoading ] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const limit = 9
            const dashboardData = await getDashboardData(currentPage, limit);
            console.log('Dashboard data:', dashboardData);
            setData(dashboardData.data);
            setTotalPages(dashboardData.totalPages);
            setLoading(false);
          } catch (error) {
            console.error('Error loading dashboard:', error);
          }
        };
        fetchData();
      }, [currentPage]);

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
      const handleDateChange = async () => {
        const limit = 9;
        try {
          if (startDate && endDate) {
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();
        const filteredData = await getDashboardDataFilter(currentPage, limit, startTimestamp, endTimestamp);
        console.log('Filtered data:', filteredData);
        setData(filteredData.data);
        setTotalPages(filteredData.totalPages);
          }
        } catch (error) {
          console.error('Error filtering dashboard data:', error);
        }
      };
    
      // useEffect(() => {
      //   handleDateChange();
      // }, [startDate, endDate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <div className="mb-4 flex justify-center items-center bg-white p-4 rounded shadow">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="mb-2 md:mb-0 md:mr-4">
          <label className="block text-gray-700 font-bold mb-2 text-start">Start Date:</label>
          <DatePicker
            className="border rounded py-2 px-3 text-gray-700"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date ?? undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select Start Date"
          />
        </div>
        <div className="mb-2 md:mb-0 md:mr-4">
          <label className="block text-gray-700 font-bold mb-2 text-start">End Date:</label>
          <DatePicker
            className="border rounded py-2 px-3 text-gray-700"
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date ?? undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select End Date"
          />
        </div>
          </div>
        </div>
        <button
          className="bg-Indigo-500 hover:bg-Indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDateChange}
        >
          Filter
        </button>
      </div>
      
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data && !loading &&
            data?.map((lake:any) => (
                <LakeDetails key={lake._id} data={lake} />
                
            ))}
            {loading && <p>Loading...</p>}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

    </div>
  );
};

export default Dashboard;
