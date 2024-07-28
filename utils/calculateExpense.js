const calculateExpense = (amount, participants, splitMethod) => {
    let splitData = [];
    switch (splitMethod) {
      case "equal":
        const equalAmount = amount / participants.length;
        splitData = participants.map((participant) => ({
          user: participant.user,
          amount: equalAmount,
        }));
        break;
      case "exact":
        splitData = participants.map((participant) => ({
          user: participant.user,
          amount: participant.amount,
        }));
        break;
      case "percentage":
        splitData = participants.map((participant) => ({
          user: participant.user,
          amount: (participant.percentage / 100) * amount,
          percentage: participant.percentage,
        }));
        break;
      default:
        throw new Error("Invalid split method");
    }
    return splitData;
  };

  export default calculateExpense;