import React from 'react'
import PageTitle from './PageTitle';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Features() {
    const features = [
        "Experienced Staff",
        "24/7 Support",
        "Digital Records",
        "Secure Billing"
    ];

  return (
    <div>
        <PageTitle title = "Why choose us?" />
        <div className='why-grid'>
            {features.map((feature,index) => (
                <div key={index} className='why-card'>
                    <FontAwesomeIcon icon={faSquareCheck} className="icon"/> {feature}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features;