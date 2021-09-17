import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import ContactCard from '@app/components/ContactCard';
import GridWrapper from '@app/components/GridWrapper';
import Title from '@app/components/Title';

export default function ContactPage() {
  return (
    <MaxWidthWrapper>
      <GridWrapper>
        <section aria-label="page title" className="w-full flex flex-col items-center justify-center my-5">
          <Title>Contact Me</Title>
          <div>
            <h2 className="italic md:font-light text-base sm:text-lg md:text-xl">Contact me on these platforms</h2>
          </div>
        </section>
        <section>
          <ContactCard className="w-full h-full justify-center items-center" />
        </section>
      </GridWrapper>
    </MaxWidthWrapper>
  );
}
