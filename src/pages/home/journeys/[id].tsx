import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import {getMongoDb} from '@server/mechanisms/database';
import Journey from '@server/models/Journey';
import assert from 'assert';
import {Db, ObjectId} from 'mongodb';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from 'next';

const getStaticPaths: GetStaticPaths = async function () {
  // Call database to get journeys
  const db: Db = await getMongoDb();
  const journeysCollection = db.collection<IJourneyCollection[number]>('journeys');
  const journeysIds = await journeysCollection.distinct('_id');

  // Get the paths we want to pre-render based on journeys
  const paths = journeysIds.map((journeyId: ObjectId) => ({
    params: {id: journeyId.toHexString()},
  }));

  return {
    paths, // We'll pre-render these paths at build time.
    fallback: true, // And enable statically generating additional pages
  };
};

const getStaticProps: GetStaticProps = async function (context: GetStaticPropsContext) {
  assert.strictEqual(typeof context.params, 'object');
  const params = context.params as Exclude<GetStaticPropsContext['params'], undefined>;
  assert.strictEqual(typeof params.id, 'string');

  const db: Db = await getMongoDb();
  const journeysCollection = db.collection<IJourneyCollection[number]>('journeys');
  const results = await journeysCollection.findOne({_id: new ObjectId(params.id as string)});

  let config: GetStaticPropsResult<{[key: string]: any}> = {
    props: {},
  };

  if (results !== null) {
    config = {
      ...config,
      props: {
        journey: new Journey(results).serialize(),
      },
    };
  }

  return config;
};

export {getStaticPaths, getStaticProps};
export {default} from '@client/components/pages/JourneyDetails';
