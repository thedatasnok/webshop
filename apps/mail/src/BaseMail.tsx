import {
  Body,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';

interface BaseMailProps {
  children: React.ReactNode;
  preview?: string;
}

const BaseMail: React.FC<BaseMailProps> = ({ children, preview }) => {
  return (
    <Html lang='en'>
      <Head>
        <Font
          fontFamily='Roboto Condensed'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/robotocondensed/v25/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>

      {preview && <Preview>{preview}</Preview>}

      <Tailwind>
        <Body className='bg-black font-sans text-zinc-50'>{children}</Body>
      </Tailwind>
    </Html>
  );
};

export default BaseMail;
