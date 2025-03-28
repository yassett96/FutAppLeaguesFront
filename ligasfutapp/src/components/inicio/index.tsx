import React from 'react';
import HeaderInicio from './HeaderInicio';
import HeroSectionInicio from './HeroSectionInicio';
import ActivityTimelineInicio from './ActivityTimelineInicio';
import FeaturesSection from './FeaturesSection';
import FieldSection from './FieldSection';
import FeaturesTable from './FeaturesTable';
import FooterInicio from './FooterInicio';

const HomePageInicio = () => {
  return (
    <div className="bg-gary-f9fafb">
      <HeaderInicio />
      <HeroSectionInicio />
      <ActivityTimelineInicio />
      <FeaturesSection />
      <FieldSection />
      <FeaturesTable />
      <FooterInicio />
    </div>
  );
};

export default HomePageInicio;