import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { createURQLClient } from "../util/createURQLClient";
const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Frontend Boilerplate </title>
        <meta name="description" content="Frontend Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Heading>Frontend Boilerplate</Heading>
        </div>
      </main>
    </Layout>
  );
};

export default withUrqlClient(createURQLClient, { ssr: true })(Home);
