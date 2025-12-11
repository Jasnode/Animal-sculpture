(function(){
  function getKeysFrom(Tscores, animals){
    if(Tscores) return Object.keys(Tscores);
    if(animals && animals.length && animals[0].dims) return Object.keys(animals[0].dims);
    return ['O','C','E','A','N'];
  }
  function cosineSimilarity(a, b, keys){
    let dot=0, na=0, nb=0;
    for(const k of keys){ dot += (a[k]||0)*(b[k]||0); na += (a[k]||0)**2; nb += (b[k]||0)**2; }
    if(na===0 || nb===0) return 0;
    return dot / (Math.sqrt(na)*Math.sqrt(nb));
  }
  function nearestAnimal(Tscores, animals){
    const keys = getKeysFrom(Tscores, animals);
    let best = null, bestSim = -Infinity, second=null, secondSim=-Infinity;
    for(const item of animals){
      const sim = cosineSimilarity(Tscores, item.dims, keys);
      if(sim > bestSim){ second = best; secondSim = bestSim; best = item; bestSim = sim; }
      else if(sim > secondSim){ second = item; secondSim = sim; }
    }
    const bestName = (best && best.name) ? best.name : '';
    const secondName = (second && second.name) ? second.name : '';
    const mixed = (bestSim - secondSim) < 0.03 ? `${bestName}-${secondName}` : bestName;
    return {best, second, bestSim, secondSim, type: mixed};
  }
  window.Scoring = { cosineSimilarity, nearestAnimal };
})();
