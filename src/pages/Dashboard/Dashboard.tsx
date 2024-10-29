import React, {useEffect, useState} from 'react';
import { getDashboardData } from '../../services/dashboardService';
import LakeDetails from '../../components/LakeDetails/LakeDetails';
import Pagination from '../../components/Pagination/Pagination';
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css';
interface Lake {
    _id: string;
    date: string; // Assuming date is a string, adjust if necessary
    // Add other properties of the lake object here
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
      const handleDateChange = () => {
        // Implement logic to filter data based on startDate and endDate
        if (data) {
          const filteredData = data.filter((lake) => {
            const lakeDate = new Date(lake.timestamp);
            return (
              (!startDate || lakeDate >= startDate) &&
              (!endDate || lakeDate <= endDate)
            );
          });
          setData(filteredData);
        }
      };
    
      useEffect(() => {
        handleDateChange();
      }, [startDate, endDate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <div className="mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date ?? undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date ?? undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
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
