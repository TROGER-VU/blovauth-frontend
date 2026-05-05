export const generateDID = () => {
  return "did:biov:" + Math.random().toString(16).slice(2);
};

export const generateVC = (did) => {
  const vc = {
    did,
    issuedAt: Date.now(),
  };

  const hash = btoa(JSON.stringify(vc));

  return { vc, hash };
};

export const verifyVC = (vc, hash) => {
  return btoa(JSON.stringify(vc)) === hash;
};