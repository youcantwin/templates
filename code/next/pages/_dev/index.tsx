import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

interface DevProps {
  components: string[];
  story?: string;
}

// This is a dev page to test components individually, like storybook
export default function Dev({ components, story }: DevProps) {
  if (!story) {
    return (
      <div>
        <h1>Components Dev Page: Choose one</h1>
        <ul>
          {components &&
            components.map((name, index) => <li key={index}>{name}</li>)}
        </ul>
      </div>
    );
  }

  const MyComponent = dynamic(() => import(`@/components/Foo/${story}.story`));
  return (
    <div>
      <h1>Components Dev Page</h1>
      <ul>
        {components &&
          components.map((name, index) => <li key={index}>{name}</li>)}
      </ul>
      <hr />
      <MyComponent />
    </div>
  );
}

//TODO: list all the components with a "story"
interface ComponentTree {
  children: ComponentNode[];
}

interface ComponentNode {
  type: "story" | "folder";
  name: string;
  children?: ComponentNode[];
}

const listStories = async () => {
  return [];
};

export const getServerSideProps: GetServerSideProps<DevProps> = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      story: context.query.story && String(context.query.story),
      components: ["a", "b", "c", "d", "e"],
    },
  };
};
