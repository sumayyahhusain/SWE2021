// Sumayyah Husain
// @02921486

/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
function findAllSolutions(grid, dictionary) {
   let solutions = [];
   
   // 1. Check inputs Params are valid (return[] if incorrect)
   
   // 1a. Check if any empty input
   if(grid == null || dictionary == null)
     return solutions;
   
   // 1b. Check if NxN
   let N = grid.length;
   for(let i = 0; i < N; i++) {
     if(grid[i].length !== N) {
       return solutions;
     }
   }
   
   // Convert input data into the same case
   convertCaseToLower(grid, dictionary);
   
   // Check if Grid is valid
   if(!isGridValid(grid)){
     return solutions;
   }
   
   // Set up all data structures (Trie/Hash/List/Set)
   let solutionSet = new Set();
   let hash = createHashMap(dictionary);
   
   // Iterate over the NxN grid - find all words that begin with grid[y][x]
   for(let y = 0; y < N; y++) {
     for(let x = 0; x < N; x++) {
       let word = "";
       let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
       findWords(word, y, x, grid, visited, hash, solutionSet);
     }
   }
   
   solutions = Array.from(solutionSet)
   
   return solutions;
}

function findWords(word, y, x, grid, visited, hash, solutionSet) {
  
    let adjMatrix = [[-1, -1],
                    [-1, 0],
                    [-1, 1],
                    [0, 1],
                    [1, 1],
                    [1, 0],
                    [1, -1],
                    [0, -1]];
    // Base case:
    // b1: y and x are out of bounda
    // b2: already visited y and x
    // --> then return immediately
  
    if(y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] === true)
      return;
  
    // Append grid[y][x] to the word
    
    word += grid[y][x];
  
    // 1. is the new word a prefix for any word in the trie/hash
    
    if(isPrefix(word, hash)) {
    // 1a. is the prefix an actual word in the dictionary (trie)
      visited[y][x] = true;
      
      if(isWord(word, hash)) {
      // 1b. if true and word size > 3 --> add word to solutionSet
        if(word.length >= 3)
          solutionSet.add(word);
      }
    // 2. keep searching using the adjacent tiles --> call findWords
      for(let i = 0; i < 8; i++) {
        findWords(word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet);
      }
    }
    // 3. If not a prefix, unmark location y,x as visited 
    visited[y][x] = false;
}

function isPrefix(word, hash) {
  return hash[word] !== undefined;
}

function isWord(word, hash) {
  return hash[word] === 1;
}

function createHashMap(dictionary) {
  var dict = {}
  for(let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for(let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, j-1);
      if(str in dict) {
        if(str === 1) {
          dict[str] = 1;
        }
      }
      else {
        dict[str] = 0;
      }
    }
  }
  return dict;
}

function convertCaseToLower(grid, dict){
  
  for(let i=0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  
  for(let i=0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
}

function isGridValid(grid) {
  var regex = /(st|qu)|[a-prt-z]/;
  for(let i=0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if(!grid[i][j].match(regex)) {
        return false;
      }
    }
  }
  return true;
}


/**
var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
**/

//console.log(exports.findAllSolutions(grid, dictionary));

export default findAllSolutions;