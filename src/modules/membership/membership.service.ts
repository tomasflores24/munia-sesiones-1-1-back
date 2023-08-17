export const getMembershipData = async () => {
    try {
      const membershipData = [
        { id: 1, name: 'VIP', amount: 100 },
        { id: 2, name: 'Empresarial', amount: 150 },
      ];
      return membershipData;
    } catch (error) {
      throw new Error('Error getting membership data');
    }
  };
  