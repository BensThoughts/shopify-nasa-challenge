import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import ContactCard from '@app/components/ContactCard';

export default function ContactPage() {
  return (
    <MaxWidthWrapper>
      <ContactCard className="w-full h-full justify-center items-center" />
    </MaxWidthWrapper>
  );
}
