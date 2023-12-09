const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);
const merkleTreeRoot = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  const { proof, name } = req.body;
  const isInTheList = verifyProof(proof, name, merkleTreeRoot);

  if(isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
