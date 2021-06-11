import React from 'react';
import PrivacyPolicy from '../components/PrivacyPolicy';


const Privacy = () => {

    return (
        <div style={{ width: 'fit-content', height: 'fit-content', margin: 'auto', overflow: 'auto', padding: '5em' }}>
            <div style={{ display: 'inline-block', paddingTop: '1em' }}>
                <div>
                    <PrivacyPolicy />
                </div>
            </div>
        </div>
    )
}

export default Privacy;