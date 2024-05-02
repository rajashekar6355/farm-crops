import React, { useContext } from 'react'
import "./CropDisplay.css"
import { Storecontext } from '../context/Storecontext'
import Farmitem from '../Farmitem/Farmitem';
 
const CropDisplay = ({category}) => {
    
    const {food_list} = useContext(Storecontext);

  return (
    <div className='crop-display' id='crop-display'>
        <h2>Top items near you</h2>
      
      <div className="crop-display-item">
        {food_list.map((item,index)=>{
          if (category === "All" || category === item.category) {
            return(
              <Farmitem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}    />
              
          )
          }
          
        })}
      </div>

    </div>
  )
}

export default CropDisplay 