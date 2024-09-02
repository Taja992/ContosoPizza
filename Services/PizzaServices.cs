﻿using ContosoPizza.Models;

namespace ContosoPizza.Services;

public static class PizzaServices
{
    private static List<Pizza> Pizzas { get; }
    private static int nextId = 3;

    static PizzaServices()
    {
        Pizzas = new List<Pizza>
        {
            new Pizza { Id = 1, Name = "Classic Italian", IsGlutenFree = false, Price = 10 },
            new Pizza { Id = 2, Name = "Veggie", IsGlutenFree = true, Price = 12 }
        };
    }

    public static List<Pizza> GetAll() => Pizzas;

    public static Pizza? Get(int id) => Pizzas.FirstOrDefault(p => p.Id == id);

    public static void Add(Pizza pizza)
    {
        pizza.Id = nextId++;
        Pizzas.Add(pizza);
    }

    public static void Delete(int id)
    {
        var pizza = Get(id);
        if (pizza is null)
            return;

        Pizzas.Remove(pizza);
    }

    public static void Update(Pizza pizza)
    {
        var index = Pizzas.FindIndex(p => p.Id == pizza.Id);
        if (index == -1)
            return;
        Pizzas[index] = pizza;
    }

}