import GridWrapper from '@app/components/GridWrapper';
import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import ContactCard from '@app/components/ContactCard';

export default function ContactPage() {
  return (
    <MaxWidthWrapper>
      <GridWrapper>
        <ContactCard />
      </GridWrapper>
    </MaxWidthWrapper>

  );
}
