import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-6xl mt-6 mb-10 font-bold">👋 Hallo</h1>
      <p className="text-lg">I've made two versions of the EPG:</p>
      <ul className="list-disc list-inside p-2">
        <li>
          The{' '}
          <Link to="/web" className="underline text-blue-500">
            first one
          </Link>{' '}
          is the responsive web version
        </li>
        <li>
          The{' '}
          <Link to="/tv" className="underline text-blue-500">
            second one
          </Link>{' '}
          is a SmartTV version using the <i>norigin-spatial-navigation</i>{' '}
          library
        </li>
      </ul>
      <p className="my-2">
        Since I didn't have the full week data, I reimagined the EPG design
        using a custom look & feel trying to reuse the same components across TV
        and Web.
      </p>
      <h2 className="text-3xl mt-5 mb-3 font-bold">Features</h2>
      <ul className="list-disc list-inside p-2">
        <li>
          Every minute (5 minutes in the TV version) the EPG rerenders updating
          time positions and live elements.
        </li>
        <li>Now button that scrolls to current time</li>
        <li>Fallback emoji for channel images (they are not working)</li>
        <li>More info popover when an element is focused / hovered</li>
        <li>Dark / light theme (Web only)</li>
        <li>Zoom controls (Web only)</li>
      </ul>
    </div>
  );
};

export default IndexPage;
