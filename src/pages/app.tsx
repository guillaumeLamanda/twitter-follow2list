import { GetServerSideProps, NextPage } from "next";
import WithApolloClient from "graphql/withApollo";
import { initializeApollo } from "graphql/apollo";
import FriendList from "components/FriendList";
import ListList from "components/ListList";

const AppPage: NextPage = () => {
  return (
    <div className="flex content justify-between">
      <FriendList />
      <ListList />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default WithApolloClient(AppPage);
