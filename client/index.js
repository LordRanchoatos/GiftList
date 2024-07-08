const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // create a new merkle tree from the provided list
  // find the index of the name to proof from the list
  // find the proof for that index
  const name = 'Robin Hessel Jr.';
  // const name = 'Katrina Hansen';
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot(); // the console log of the root, is used in the backend
  const index = niceList.indexOf(name);
  const proof = merkleTree.getProof(index);

  // console.log(merkleTree)
  console.log(root);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!

    //send the name and proof
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();
