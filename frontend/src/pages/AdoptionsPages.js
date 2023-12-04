import React from 'react';
import AdoptionBreadcumb from '../components/adoptions/AdoptionBreadcumb';
import AdoptionSlider from '../components/adoptions/AdoptionSlider'
import AdoptionPuppies from '../components/adoptions/AdoptionPuppies'
import AdoptionFaq from '../components/adoptions/AdoptionFaq'
import AdoptionGallery from '../components/adoptions/AdoptionGallery'

import BreadCumb from '../components/doglists/BreadCumb';
import AdoptionShop from '../components/AdoptionShop'

function AdoptionsPages() {

	return (

		<main>
			<BreadCumb />
			<AdoptionShop />
			{/* <AdoptionBreadcumb />
			<AdoptionSlider />
			<AdoptionPuppies />
			<AdoptionFaq />
			<AdoptionGallery /> */}

		</main>

	)
}

export default AdoptionsPages;
