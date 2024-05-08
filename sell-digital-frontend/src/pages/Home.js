import React ,{useState,useEffect}from 'react';
import SectionsHead from '../components/common/SectionsHead';
import AllProducts from "./AllBooks"
import PlantoRead from './PlantoRead';
import CompletedBooks from "./CompletedBooks"
import CurrentBooks from "./CurrentBooks"
const Home = () => {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        // Check if token is available (you might need to replace this with your actual logic)
        const token = localStorage.getItem('BOOK_BUDDY');
        setHasToken(!!token);
    }, []);
    return (
        <main>
            {/* <section id="">
                <HeroSlider />
            </section> */}
            <section id="" className="section">
                <div className="container">
              
                      <SectionsHead heading="Completed Books" />
                    <CompletedBooks />
                </div>
            </section>
            <section id="featured" className="section">
                <div className="container">
               
                    <SectionsHead heading="Currently Reading Books" />
                    <CurrentBooks />
            
                </div>
            </section>
            <section id="products" className="section">
                <div className="container">
            
                    <SectionsHead heading="Planning to read" />
                    <PlantoRead/>
                   
                </div>
            </section>
        </main>
    );
};

export default Home;;