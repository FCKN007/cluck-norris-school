import { useState, useEffect } from "react";
const CLKN_MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
const BAGS_API_KEY = "bags_prod_SIjyt_Gh-_pIaZyQ5E1jT3r-wLujR_0I-ZRD-f-CuJI";
const BAGS_BASE_URL = "https://public-api-v2.bags.fm/api/v1";
const CLKN_TRADE_LINK = "https://bags.fm/DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS?ref=firechicken007";
const PARTNER_LINK = "https://bags.fm/?ref=firechicken007";


const LOGO_B64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgwKCA0MCwwPDg0QFCIWFBISFCkdHxgiMSszMjArLy42PE1CNjlJOi4vQ1xESVBSV1dXNEFfZl5UZU1VV1P/2wBDAQ4PDxQSFCcWFidTNy83U1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1P/wAARCAEEAQQDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAAIDBAUGAQf/xABJEAACAQMCAwUFBQUEBwcFAAABAgMABBEFEiExQQYTIlFhFDJxobEjUoGRwRVC0eHwBzNichYkY4KisvElNENTkpPSJlRzg8L/xAAaAQACAwEBAAAAAAAAAAAAAAADBAACBQEG/8QAMxEAAgIBAwIDBgUFAAMAAAAAAQIAAxEEEiExQRMiUWFxgaHB8DKRsdHhFCMzQvEFYnL/2gAMAwEAAhEDEQA/APMKKKKkkKKKKkkKKKKkkKK6AScCuujI2GBB8jUncHGZyuU7EIyW7wkAA4wOZpUESys26RYwFJy3X0+NcJxLBCcRnFLVcnHzrmMnAqw063BuVDgMB4iOhwcAfn9KqzYGYSqouwURTWq2ViJrhcyTcI0Ye6PvEdT6VN03Skmha5uyY7dMeHz8gfMny/OndVAutaSL3o4FCjPU/zOTS755Llksrdgsac25D1Y+ppcuTNqvSKpLEZA4HtP38JWXN3DJcGGBI4YR17sE/TnUOWD7ocKOWUNauwg0jSoy8yG4fHPkD/AF6/lSbjXrR8rHYwKPhx/SoHx+GVfSFv8pA+nzH6THNGQMjBHmKRWhuWs7zjsET9GUf1n8aprqAwylSBnnw5EeYoyWbuDM7U6Q1eYHIkeipFpbG4aTHHu0LkD0pgjBwaJkZxEypADes5RRRXZWFFFFSSFFFFSSFFFFSSFFFFSSFFFFSSFFFFSSFFdoxUkhQBmu7TjNFclsR6yuPZbuOfYr92wYKwyDjzqXBE+salI8kipuy8kjcAPWoEkex9u4N6qcipllp1xcDcFKw/vSHkB50J9oG7OD6xikMW2YyPSMzxIbsxW2XXO1T971p+XT2juEtwd0zYyByGelSdFgWbV1ESkquSM8/SrzU5rXTpSWZXnC8gOOfL4UCy8q4ReeI9Tpa3Qu5xz8pmzbqt08cPHu/Du+82cfU0/YL3NzMASe7k2jPkD/ADrmneOTvG4kzx/Un6ilD7O7nPRgJB8s1ZieVl9Mq7xYOx+hkuRgb2V/Un+FNJKMGQnC54evrTNzJhpsczgD8aYMp3DbyXgv8aoEyI8+oCNj3/rLASR7w0wU4/dPOpDXWn3I2S2MHLAKEqw/SquIQFsy5f4tipM9hbywGTT5ZElUZMMh3Bv8p/Su7QO841rsM7QR6d5Haxt4rvBMhhfwqwbaUbpn06VGnXw7A5facYcYZfP407DP38TwyDDYxx6UzdhpZUZRlpUVsDqSOPzoi53eaZlwrxuqHBidOvHsL1Zo8ErwIYZDDqDT2uC2N6JbRQkUqB9n3CeY/OosYWIuJoycqQOOCp86QoVi29iuAccM5PlRNo374mWIr2H/AJGqK7jPKiixacortcqSQoooqSQoooqSQoooqSQoooqSQoooqSQrtFFSSFKFcp2GQxEkAEkEcRnnwrhhFAJ5jntH+p+z7Fxu3FsceWMZ8qjgZNdPE1Y2Gnl9WhtnwSWG4eXXFDLKgJ+MMqNaQPhJmm6F3sInu3MUZ4/h61a3N7b3Vuum6cT3ePG+OAHnT/aa1l9lSCE7Y0XLHHvf0ai9l9MYCSWcFEOCxPQCso2CxPGc9OgmyiCshFHHcydo2nxWSTSoCdi5LHmT0rKXkb3NxdTMSVjJJb8cAVvJpFntQI1EFmpyST4mxWN1bVo7uP2e2gEMe7JI4lqmkd2ctj+JNSEFeDx7IxZSO1vM4VfsERxwwPCwPH48advAqzeE5jx4T5o3I1L0zTBcSLaMpaFNkt4wcLtHNVXPPnxI8/zRrOmy2ZOI3FpkmI4JMYJztPp9KcBBfiI12lCR95EqJXJ8TGkx7pMiOORwOB2Lmtp2M7GHVUTUdR8Nof7pDzf/ABfCvRJdH0mOzFu8MMduo93O0fnTEXe4luJ4UqP3cj9xju/eUvhwPPHPFKhuVRgyE4zgg8xXpWv9hbVl9s0YezyqMjZJuDfgf415jcWM0V2bV0xOX2qBwBJPKuYByDOpe68iOzxk3LTxcwm8j73EA/UUm7DQXKIp8UKqpI6EDj86k2DyR95KpKvDEwJHRiQB9DUDvXWRmViCwIPqDzqq5Jx6QlhBJYd/syZqt6moW8EzKouhlZSBjcOh+tRLG3iuZe6kkMbNwVuYz611YkeJNrHvGYgrjp0NcMLwzlCCCpINdUBV2rxKEFnDsMx+S1n0i/QXEYxzIYZDrTV5HbwapIq5e3D8Np4la13aKD2nsraXEg+2jAG7qRWTsI7aWUpdl0Ug4kUZ2npkeVBou8RC56jIMvdUEOxenURmO1aedkhBIwWXcMEgZP0FJltJIraKdh4JSQp88c60VjoqXOlNMszLdI2Ej6FD1B+OaZ1HSJ7cx2znewdlEecKpOMHPr+lWGpUvtzOHSNtziZyuU7cRrFO6KwcKcbh1pqmwcjMzyMHEKKKK7OQoooqSQoooqSQrtFFSSFdrlSSFKFcp2GQxEkAEkEcRnnwrhhFAJ5jntH+p+z7Fxu3FsceWMZ8qjgZNdPE1Y2Gnl9WhtnwSWG4eXXFDLKgJ+MMqNaQPhJmm6F3sInu3MUZ4/h61a3N7b3Vuum6cT3ePG+OAHnT/aa1l9lSCE7Y0XLHHvf0ai9l9MYCSWcFEOCxPQCso2CxPGc9OgmyiCshFHHcydo2nxWSTSoCdi5LHmT0rKXkb3NxdTMSVjJJb8cAVvJpFntQI1EFmpyST4mxWN1bVo7uP2e2gEMe7JI4lqmkd2ctj+JNSEFeDx7IxZSO1vM4VfsERxwwPCwPH48advAqzeE5jx4T5o3I1L0zTBcSLaMpaFNkt4wcLtHNVXPPnxI8/zRrOmy2ZOI3FpkmI4JMYJztPp9KcBBfiI12lCR95EqJXJ8TGkx7pMiOORwOB2Lmtp2M7GHVUTUdR8Nof7pDzf/ABfCvRJdH0mOzFu8MMduo93O0fnTEXe4luJ4UqP3cj9xju/eUvhwPPHPFKhuVRgyE4zgg8xXpWv9hbVl9s0YezyqMjZJuDfgf415jcWM0V2bV0xOX2qBwBJPKuYByDOpe68iOzxk3LTxcwm8j73EA/UUm7DQXKIp8UKqpI6EDj86k2DyR95KpKvDEwJHRiQB9DUDvXWRmViCwIPqDzqq5Jx6QlhBJYd/syZqt6moW8EzKouhlZSBjcOh+tRLG3iuZe6kkMbNwVuYz611YkeJNrHvGYgrjp0NcMLwzlCCCpINdUBV2rxKEFnDsMx+S1n0i/QXEYxzIYZDrTV5HbwapIq5e3D8Np4la13aKD2nsraXEg+2jAG7qRWTsI7aWUpdl0Ug4kUZ2npkeVBou8RC56jIMvdUEOxenURmO1aedkhBIwWXcMEgZP0FJltJIraKdh4JSQp88c60VjoqXOlNMszLdI2Ej6FD1B+OaZ1HSJ7cx2znewdlEecKpOMHPr+lWGpUvtzOHSNtziZyuU7cRrFO6KwcKcbh1pqmwcjMzyMHEKKKK7OQoooqSQoooqSQoooqSQrtFFSSFdrlKArksBAClgE8hSRUuK4WKyeNFBllOC3kvl+NVYkdIetQepkTHGrXRmeHU7WUEMzNnHXHrUM2rqIw3B5MEL6dDV92etIotYlEnKHhx6nlS99gFZ90b01LBwSPvrNTKBe36oT9jGu5uPImu6k0VppL4AUHjgdRUoRxw27OFAX32/xVlNVa61G8aNmZYRxY9AKwqV8RhzgCa2T1XtKG41G6uN6h22Y4qOQFIt4BGe+uACqjKxFvFIegxzx6+VJSUpI8acInYbh5gHhVnbrbpqns94xjh2twVtoZsZBJHMHIP41vgAeUcTEvsYDexzLnQ9T060llW4MwkmVTPdNGwDHoqqBwUcunKtWutaKsULLc21xESyuCQSp2kjIPQ4I5eVeZ6hd2cLSW8VqqujFTICcnBxUK3vH76N2QTFHBRXG7Ppx6VYUqOQYoLSRPVU7a6ZbQ5BMiQxoI4IFHMjJJPJQOAGfI1TXvbTVdTtpTZafFFbLnMvcmcp67jhM/nWEvLqVpGd025kY7CMBTw6cuVLOp311BHbd7IYFIAUsdqk+nKiAACUZvWXum9q9Q0p2WKYsJT41mh3Ix88bsA/DFN6jrMOoXUd6kSW2pW77sL/AHUuPjxBx0+flVX6paIlmGLyCQu7ZyAeK4+Qq2t+x13e6PDe2a4cxByhYHI88cxQyVZeZ2ly43Ccuba2S0X2aQ9xct3xkYefIHHQcR+dZ2RMORz+FX9jHL7Hc2M8ZSS3w4UjkG5gemcEfGqpSILtGdNyq3iU9RQKSVLDrNRlVq1xxExxNEIpseFicfhW4t9P03VoXmSVUnmUZjP3vSqDT5LGdZbSZtke8tE5HL0qxGnGB47mym7yNSN2KU1LljjJUx6mvaPKZ3tik0FnaWwP2arg45E1T3GniD2O3iVe8lj7xnPX0yeQrc3NtBqloqOMpJ7rfdby9KZfQre/01C4PfW4ZMHmcUpTqxWgVu2czjKp5brJfZdbW5jN1NHb2yquW2+ELgcznlmrDtDp9neaLK8LRtHIPeHpWE/1l7iHTIJMlXK7sHaWXBLk8iE5Y48c+lbDULq30zs8ttHI7BQfHIcl2PPOK66Ig/8AY8jrmK7me4FTx8p5Le24ic4Ryq+EsRjxdahVea3dJdXTyQxG2hf3kRiY3cdRVbfS28rxm3gMOFAYb9wJ8xnlW5U7FRkRC9AGJEi1yu0UeKzlFdrlSSFFFFSSdoortSdgKfm7oLGIs52+Mnz9KZxigVUiEU4BEUMk4FT9PsmfVoraQcd4DCoSblIfHAHnVra6gra+l3s2KWGRzwcY+tCtLYO30MaoVcgt1yPyl1Josr6vPPJhYISCM9cDhTOnQG97Qb4wdm7J+A61rXUXNptIP2nDAqHN7F2et+C5kfpniaw11LMCuPN0E2MD45zLC/khgtCZj9mDxA6+lY/W+0IngaC3iWNW4EgcSK7e3t3rokKFY4IRlmJ2qo/rpVFY2M2o3fcQDc3E5JwAPM0fS6VEG6w8j5ReyxlAVepnIp98ccIRRh9zMBxY/wAqf7QxlJ7acfvxKc+q+E/QfnRDBFHqoi7zMattZwM58yK0Gp2Ud7pcESLiZ7lI4CeO3dnOfTA+VONaEsU9j9YrZUWobPaZ2S4s71VNyNsjKXZ1PLxNkfHjWq/s97OxPFLqt0m5VyIVb6/1+tZGfS5LeaeJhEDEVQnjks3IAefWvXtMjW00S3giGF4n8BwHyAoertFabVPX7+sQ02nKHM887WQwXl5dz2isghkEVxuXG1uOH/yniM1Qpd+xQvEkGCwxuccc4YZ/4vlXsM4jliaOUKyOMFW6isDrWnafpt2scEt2C54RWz5I652+VC0urRlFTA8Qt+l8TzEzLQ21zdXK4RmlnfagI4ux8vzr2Zok03UdCso2mDRwmIiKIEMAvElsZABxkeoPSsFpOoWvZzUJ5Gh9suk2mKRs79rczx4Aitb2WtLrUryPXdQEcveINjQOy92wBBJXkSQcZHlWlvDDI6QXh7eDKntVZfsntDHcuNttdAwsR7o3cQfTBHGs/f6RLLJL3SjvEBJTqcc8edeidr+7Gmlb+Iz6fIMNKvExnzPpy49DWI4zWzwtIJLi2A+0B/vYz7jj6H1pK3KMGX7+/wBpoaVwwNbd/wBZlAQoYEeLoc8qvOzurnT5yJ89zIuDkcPjVRdwskhz511vaDaRoSTECSo8j1pixFsTaehlkLIx9k141cBTcWrfZlsSovLP3gKuxqltbR+1XM8UCTx78O4BLDgcDmc1jNAtmHtBuPs4e7O9n4AepqRbXs7avJeWkdy0AZgssFoZSVChVHHgBw+dZx0aWPsHQd4e+7yDsTHezrLcvdyJIhnESA7WyTkl24c+eOXAcvWuXN9JbzQSKDI0ZMsqNxHA/TBqiu7y4a/T2tpiA3ORNjr6g9DVvexXFzpsF0f71rcPIQMbsjiaYtqAsDHoYLTOdrVDtzKK+uVmvnkt12QtLuWBjkD+uVMakYmu3aGEwecROdp649M0qbuWgiABWUMQ56EdD9fypi7hkgnKS+9zznOR508gAIiNu4gmMigjFFBo0VnK5Xa5XZWFFFFSSdFdHOiu1yWEcllaXZux4FCjA6CkDnS40DhyXC7VyM9fSkhSckDIHP0qvA4hcE8mXL6bLJo1pLEhfczZ2jqf+lTLLs3cRXMck20QjDFv0qd2Uvo3sTaSAHY2cHy8606+zxw+1XZLcfsYRyOOprFv1VtbFMes2kqrIWzGekSiyGNYEJQKneSsOYB5D41i9emm1DUH2KQiAgDoAK2UeoRWsMst4wLXXFlB5DoKzuu39mlu0dmPFIME5yaBpCy2fh++8M4yCG4mXWac2zRKT3SncwHLPLJotrqWCORIjtEowxHMjyqR+zJxZ+0MMRs2Bk+8fSuxWxVldUOFAJzxyf4Vs7kIMzgj5EVpds894ihSWJ5Vor55Y9X0WzgGWZyWYcl3HaD8cBiKh2MMzS+1NwLuQTyyeuKtdSvvZb3TCx3G3jllRPvMcIgH4k0i77rlGM9f0hbl20depErO01rJY6i0jBHWVkmkzzQhuY/A4rR6priWOmwqjMznwBU95j90eXqeg+NRu1NqU01jKQ8soWHPUkAZ+ZJrGftGUXn+uZkWFe5V0HFQOuOuetEs0/i4Pp84or7T7/lLy4urwwG51O6e3tzxWCB9pb4t7xqmbW5rdX/ZtvHZoRxcDMjD1Y8aaluJNTujLIzNGg8Ab6041viBMjOF4jzB50RKlXhh8O0aSg2gsnA9e8s9Aiez1S3u9RiFxaXTd3JK3iAY8s+X869W0/TobCOZdOAiRjvEP7it6eQP1rAf2f3sUrXGjX6LLGy8A3Jl/rFa/VpLnRorS5t988cIZJU5s8YGQw8yOPxGaOJnuDnBj37Ts5beUykC1kyJFcf3TZ2sGHTj9fKvPl0SDTO1DxiSRI5FZoNpBVlHvxn8DkH4VobK7sZde1a5yr28musrLnIdGXicdeArGX98+mXc1m5aQWVykltLz4dFJ9VPyoFilzlV7zq4Uhj2j+sQQrDnBEqt+DCn9Etbe/tzbyuEYHKMfmKstX04SxySQjJj4lfIdD6iqOytZQZGUe54iPSkkcPVgHBm5/vkd5e61ZJA1lbSYaOSbewPJ1RCxBHlnFQhej/RphJcgyyTZ2mTiAB5dBxruptQm6Np3mcw2kr4yepVBmuXb9zoenwoduQ7NjhnJx+ld04IrG775nNOrNYze3H5CZq/unQna+5TzVvEp/CrnQp3azntsEwtamZEJz3R3bSAfI88VnNRKmU4A59K1nZUKhumkTAjghiweoOWNM6nC05xEWsZtV8ZmdQtjEFkHJiQfiKjXVy1wkIf3o02Z8wOVa3thaQ2tpEsXJ23Csg8BWVVYhQ2CGPLB60bTWi1A8HqkKsdnQ4jSKXYKoyScADrXCMUe63A8qCaamfE0Uo8aTXZUicooorsrFCpzWsY01bgyjvDJtEfXGOdQRU6KFHsJZnmCshAWPq2ef5YobnGOYxUM5Ehcqej7wQttzsbwn1603wOBjj5+day00J7nT7BowCpJZ/xod1y1gFofT0mwnB6SL2bt3XvJjkAjaPWtVdgOSxzsQiNR54905b20Zuu7jUCKDi3q3lUq5sC0UCltqqGd2PQedYF2oD2bjxNpNtQVJhtTmmvtTdUyFTIHkAOdRbaEXHdgMxlL+7jgB8au9VvLKJJYbOI964w0jczSreOLTNPgmihe4v522QRAY3P04dQOGfiBHisthABcdhF7dqksx47xy4u7K17uzvHkeWJf7qCPeUzx48edSbSXSryzMVpdxGVm4o52OR5YP6Vo+ztpJ2d0Uy3sBjndTNcSHDO7HickeXxqY+mdn+0duJ5LW3nEgz3qDa4+JGD+ddOkUjG4g/KI/wBbdnPGPSZmGwNrLH3qsyqThOVQ9WijTtLpd9cspWKIyCID7rHaMersAB6VZarol/2YhN3p879pNGXnMbZYsc7iM9B0Ar0bTLO2ktJLSGW0mtnVxbqjBow3JsqfFkj61k9e1iO2mhsrGEPNKB3kjDiEz0HqenWpqJbfUKobCd2/pM4iGzxuW0gCmQJG2Nx549aKYXTI4u1mnwvGxZ1iDNgDOQrHHPkKaRGhlktFuJJEMmzMjZK+nGvMrS4aGxuIn5K8XHHHA8jVPqc/2lwT51TJLZB3kqrHaLbC6yB2lhp0dlqkNkrBbdRgg8mOT+dWnai40K31GyttN0yETGDdPOZGDhm6BeeMDyPxqvv7+2trCFYpzJJGAJHHBD5gfAVG0K1k1C61S7uS5t7NFVpA3v7ThcDzJzTNRiVPp7RjT3IcMWyV5jJO97e2oUNRi1Ca8k8rJp8FrCkDSS29sQGz9mB7wXoWbJx6VOu7DUeytlbGJY/bL5sxZI8IXnk4PP8AyVLjvby3e5sLSFJo7VdqLx2jjz+Fes9gNFg1bsXAl7bpMkJktXWT7pRjgVrtOzLKWRcx+/p6cojqNwGCFh8jLG97MNqbFxKkn+oQkUxb6sGsrq7MIBgfqPnV/wBqdD0+81i1hfTNPn7sZlkBXJ+GKrLHUHOnXECRxFxgbyQCtT9T2rFojtHfzh7S/TOvJCdWBvbRR4o0yF7XoekVzk5+1aY9KlWeJxEYc8uauOzh1SW51yW7aQQPIv2UcpJKgDHXHCqHs3oFrqdleyXtsJ0jlCqCxHGrZ9Zui+0KGcr3gvj/AB6RRmz3JHOM4Vn5A3HfHsPWW/ZI6pJb28VsEt4hmWUjAHmf6601CwtreJJFG6V4gWb1PpVTe6rBpBuNPVGBVSAxbgBjjis/ZaxPdW8cxkCIo8IHMjzq/wDDa4VWM7fIyyuaqFhS0SyrqjHpCOJLlLrYqO4VgRxx8anW2p3lvBcWqSOkcrBpQpxuI61XKwMjBGHhBO4DrWi7MWUWqahJBdYeMQs4XOCWGMfyrzyrOzAHaHrqOuJZ7WNrQzPGS+GGwA5znHSqu5guJL+CWZneNhlM8ABzq5NxGup2lhLhY0QFnz0A5D8a1WoSW0Wnoh2MuQAoycdOlMEWNzAmrXh7bQUlO0dBgAJH8eCv6U5etaS2bSmJlDuVzFzKKe0j9ahJMJ7iIg7j/CuoJJXaJG5YJX5UFhzk1bJPaUmr2FrJa3lvFEblYe6ZijEbgeGCePoK1/Ze+TUNGFxboFjWR4xzJJ2kgEnzO2obZdYurS8n028VLF44iT7MH8bYKqD5ng3y9avuxF9FNo0UkCFCssmVJyQd55H4j8aX1ilKfCq5nQ0BWMN0yccRVaLqV3bRpGk77FGB4m/WkTTPcFmkiMiocpIBnFX2pxRSaYHlRX3HZtYZGR0rIi3MQU+IeoU/lQ+m1e13+E0dRS1EEDkH5Rf/ANJdW8jC7t4JYH+y7g7jnpj8qjdp4BDJZMHzviZhz6Z/lTcthqSt/o8oRCeFT8VppP5VX6xZarcW1l7VKpEasqtu5Hp8qlTdGVkVqiDsCLM4VXGJFBVhjHOnY7iSJtrna2Pu0pYz3bQshIwFyRk+lNLczywt3ybfFgEDzqDJO0MksDJho2Kt6g1bqgqGEmrqmSJsrdxbfb3ciqo4h8c6bE13JNJJIckceR6U2ql5VBO1OWTUiGBNgYnIQ7mGcntLF7jUFgcMVyM7c1Z6JYJJcy3Mqk+DKj1qJawhpJJWI2xjisZqNHp+pXFuDuVGwCeprOs0r4tMI2oY9I17TLq8upNLZ1SJ3xGScFV6iqeezZHOAN+cjnWv7IWiXF2iqNuYiRt6E8hn86ndo7YJqBiIwTCq8eIByPzquvxqV7cSpqbNXBz/aOlB7SRtI5yIlwRy4k8T60ldXiuYl3IZCgHBRzqI9zHJBBHINxQDIBx1pq2hJmBP7vINWg1TU4HA9ZeGlpvZWHp9mS7TtuNRiH3VH5VL0y6Nrq0U4X/ACPf8acBkGG4jkVHn1pM3aJoqpJ3LFoM3e8EqmMnGMenCrR0HgYSZrqOo54g3H3Z4jAGMVV6nqJXSGVo8tIVUY5ZHAV1TTPaaZE7Djy61A1iPuJbdlPEuCCPPOa68cBlJH4mI4Y1dT0lW0xnv8DqerMOYnMygkc/y+9b/tFJb3VvHaRnMls8bMMcAxG3H0yfrWNu3cXIVhlfMP51ZNqC3VrGtyvLeFSfKhqtHfmA7cBT4LW3VwPWXSMKqg7WB8TDnt/Pf8KtLuWGe0tZraZEMY2yRSHjj0/Q1zT2vJotQkDGXEqmNx0JU8j+VEE4uN7L+7IBGfLlUbDVDJHSPH7OMhh8UPUYKk1GEcCJCxAbf8OdJVzjBBz5U7Z2xnktpJAe5V9pI6Z5VpuyFvJLrF9GikhoGBB6gg8KU3KurK7e0ZrqBbJf7wyvbRlWNrpXCRkjmQp/MfCqPT7KTT5fM7s/nQ3IyuM9VPnU2aBvsxEeFmXkGHAg9PpXn5gRyW3cH84m6urHWMQfYmXqJSg7x0KSMpJC8R1GfUelVOo6xdwvfRWrbLFt3dyoAGdc8M9aWgdQwLFsgEVXXEKuHkRcbwUJHTPcfqKj2RWJHzW7U8S91e2Ec1pM1zaCE7ZCvDjwGPrULs9rVvf6xCkqNHNGrKJFHJueCa0uo20l5bRmA7mifKjrg9R9a570yd9Et5oEkPe7t+Ohwa0dPNSRHpZFLFpUHJHSuBwGxnB6VHjFtNKqzNHG0QAEpHPOOp+FSbSzumleR3c27cCpPh+VdHqElpbXDXjM0kRDPGOgx5UP+zH3hR4oC63KhSSSW5cdwHWrbsHZ29xf3OoXaRm3tkI7wgZdsHjnyAPH+FNi6ku0htjKr7MEZ6H4VX9mZJpILixU8HKN/hI5H8c/Kku7Y9fOfKJUkBRQSd/8AXv8AkKr7wbO7kJAc55deQ+WT+lSGLF45CcAFfnmofeFniC7cZzn58MVkW2yVe2H5nIH59qYj07W5Yz7XqEVuR7rRqXI+WagXUolZS0+G9fCPrTsc5aQiQ7VAwPaq7Vt/e7Qx55Ub1+Y/pVZZiScEi7gCwAAqeYNRRLPKk5eJoSSBhWySOMitHpuqzX9iFui0SBm2rj3SKoRpAVCQAIVHBMeSjyNXL2s0TqLuPMiAFXUfKk9RRKlSB0ijaVMrPJFcCNvdBBOME8KkWdjNqEd1JFKg9mjVsnHNunL4Vy51CK3/aSB9r8DI2g5FS7SOdYWaLcqSDeMEjofSl01m/pHf5R2m2DpkfeVdEPGOMYPkRwpzT+8/ayNnbyVgj5DGAo5VKFvNaIxeEKVH91hwaag4HY+MN9r8abWjdwCD7h0ifT2FW0Eni8X7WRm7knnisF2n0a4ttWlureaSNZXL4U8ck/7/ANK9AijKHJkIfPX4flVPdRr7VIJIwJFbO7b7vSiKXk4G7A6jEi3AHE5zPKiSSW4fJOY+LBRjJ4+5TqXDNJdS7P7obeByOfxqR9jujSp9hP3ePj4V3tFbdxDFaR7v3nAJ8+C8P1oilHiZ1ZvNt7kfQVLjgjIz3LdkA7YznRJgAHf0JD0tY9+pLG/u+7z8ahlWPMkfAcR7w5fjRb6X+1MwnjVNwyvzqIzCJFB4tyI/p0q6lZzuIPWLrk4q+0cxknnlk8J2jnkUmxhLySEtGF4KCeIHb/AFpMQEcJZsnd7vFSfyqBcXNxHHucbSpLJt5r6itnKSDNlYoKqc5WUOA24fPjTa2kjqS2G27uQHSmFjnKhSXAyMlTx9KmW0rS3DbQqMMFcZ+tVlFpYMJm+bHHrjpzqVFGGuVPiEXd7wXn8a7PdXJiWOPYi+YZOf4VFhuXnkEYJAOB8qMihmSSKRlkjaVioEi+96sMdKv5QT4BKJNLK2BzH5UYFXaWaTH94HwHFT7NNy7m65YfpS1+J15zE2BHCq6OJe8tLWC3WJMNIDzA9MVHuJZLxAjoiMh/dOenrVhaMt0ruAZFBG7yxVXqNqdPuZYVOz97Aq6tqvJMpqKiDRaWzJ7UIMKRz5AYqaolFnJhchyuM9OBoBc94FPLjy8qla8k0y7/ZoU90Fhg558q3FLkBjcCM4I/A1T3xCpICcHJGfSlKlqSe0FWdRRBtmJUDL4bkRw+VMNcxsAVU5HrjBFYKlXUbtzSSBN4ZJOVOOORrVxOZbVJPeZU95FPNScZHwJp3TrKJLTULrUJfs8KqiW7Ee89wTy8z0wfpUzU9Kzd7GDJKpHJT149alQXz6ZIqTsUjl52KOuOuPoah6XVTfWX5yqLq3VrfBEixpIZxHJIuVXA+1XyPOoMM0Vkl7LJI8pYFY4Rz+B9aaEdnbahbyzIJYZlZSpJ2lT0P51ZXdi1xaJcaX3sE3hZ88QccMH9KW0pjPJBGaqDHiXGN8Q5R03Wdlkl061lm4M/hT1x0/rjWb7X6X/ZTrcTafHLNeRl9oGGiZOSBfMcV+lX1vdXllKYLi2ZBIQY5ByYg9Rjp9KydhaW+oaldHVGELRkmOLP96E4kHr1x8al6qxbSVDqCPh5GcLjH5Sp1nS7nQNUijkZJLSdCYpdpBweo+nQ1TahoNrJdGSC7CITy4dBVlHcSrfXmjXPjbcGhZPEjxgZ+HMVFs52u4p0Z8CL3JVz4gP5VyNFYHHfqIsD1g7P8gIFNbdoNMJxCYnhPVTpnHwxUi+8SvBcqmZB4JVH3h6+dWH7H26lVZ2bB9MQJB+mRUBYbeSMzxuyFCSVON6+o88VarRWW33rJFZvMTiRzAoRgA+bZP500yFRGDw8Qz1NXUI2sLiQCRRIoGMEBeQFR2tiJkHdKGIYhsckHlQ6K1Xp3lNq9SEA7SOAnnLjS7aa1juIgNjrtJ6H4HrXN0nlIXqRwOKWYXjlIBGxhtx5ZHGmYWdpQ4OOe3PahlIZQ0f3WLD8frU20lVbm4t2Y/aNkMB7sgqHf0qPLbxx+7lz5Z5fyqFpF19oE8GEjVQ0m05DE+vl+VV9d5fBh2Yq4zqf4v5xJFjLGJLiTkWyONWFhOkmnxuVLEpuLdx5VJsJBPNe2jkCFrMjd5ByDVMjsjhlYE+VPanfNaaA5j5F4XJ5cBuP8aJotWLVgeoG7+ERq6d0R6SHqF7Z6ZCRFH38p5s3JAJ/h9KJZxPd3EsyxqjsfFj+FQb2xuZo9sI2gniahQTXEd2q3pIjZRhj1BPSmIqtj9kVqwN+c+V6R0UfnRXJpvIJ5k4J4dqKKkU/hKiE25GfFGSQSMA549eIoQA2Bk0UVyHU7wP/9k=";

const LESSONS = [
  {
    id: "lp", belt: "FRESHMAN", icon: "💧", title: "Liquidity Pools",
    quote: "Cluck Norris doesn't chase liquidity… he BECOMES it.",
    color: "#3B82F6", glow: "rgba(59,130,246,0.4)",
    intro: "Every trade on a DEX pulls from a Liquidity Pool  -  a smart contract holding two tokens. LP providers earn fees from every swap. No order books. No middlemen. Just math and the market.",
    concepts: [
      { term: "Liquidity Pool", def: "A smart contract holding two tokens (e.g. SOL/USDC) that traders swap against." },
      { term: "LP Provider", def: "Someone who deposits tokens into a pool and earns a share of every trading fee." },
      { term: "Trading Fees", def: "Usually 0.25-1% per swap, split proportionally among all LP providers." },
      { term: "Impermanent Loss", def: "When token prices diverge, your pool share shifts  -  you may end up with less than just holding." },
    ],
    questions: [
      { q: "What do liquidity providers earn?", options: ["Free NFT airdrops", "A share of trading fees", "Tokens from the dev wallet", "Nothing  -  it's charity"], correct: 1, explanation: "LP providers earn a cut of every swap fee. The more volume through the pool, the more you earn." },
      { q: "What is 'Impermanent Loss'?", options: ["Losing your wallet password", "A rug pull by the dev", "Value loss when token prices diverge vs. just holding", "Gas fees eating your profits"], correct: 2, explanation: "IL happens when the price ratio of your pooled tokens changes. It's 'impermanent' because it can reverse if prices converge." },
      { q: "What does a Liquidity Pool replace?", options: ["A bank account", "A traditional order book", "Your hardware wallet", "A CEX listing"], correct: 1, explanation: "DEXs use automated market makers (AMMs) with liquidity pools instead of traditional order books used by CEXs." },
    ],
  },
  {
    id: "rugs", belt: "SOPHOMORE", icon: "⚠️", title: "Rugs & Scams",
    quote: "Cluck Norris doesn't get rugged… he STUDIES the rug.",
    color: "#EF4444", glow: "rgba(239,68,68,0.4)",
    intro: "In crypto, a rug pull is when devs drain liquidity or dump tokens, leaving holders with worthless bags. Knowing the red flags is your first line of defense.",
    concepts: [
      { term: "Rug Pull", def: "Devs remove all liquidity or dump tokens suddenly, crashing the price to zero." },
      { term: "Liquidity Lock", def: "LP tokens locked in a time contract  -  proves devs can't pull liquidity early." },
      { term: "Dev Wallet", def: "The wallet that deployed the token. Large allocations here = major red flag." },
      { term: "Honeypot", def: "A contract that lets you buy but blocks selling. You're trapped the moment you enter." },
    ],
    questions: [
      { q: "What is a 'honeypot' token?", options: ["A token that pays honey as rewards", "A contract you can buy but not sell", "A token with locked liquidity", "A governance voting token"], correct: 1, explanation: "Honeypots are coded to block sell transactions. Once you buy, your funds are stuck. Always test with a small amount first." },
      { q: "Why is a liquidity lock important?", options: ["It makes the token more expensive", "It means the dev can't remove liquidity early", "It freezes trading for everyone", "It guarantees price increase"], correct: 1, explanation: "A liquidity lock proves devs committed their LP for a period of time  -  they physically can't rug before the lock expires." },
      { q: "Which is a major red flag on a new token?", options: ["Active community on X/Twitter", "Locked liquidity for 6+ months", "Dev wallet holds 40% of supply", "Listed on a DEX aggregator"], correct: 2, explanation: "Concentrated dev wallet = concentrated dump risk. If they hold 40%, one sell can collapse the price." },
    ],
  },
  {
    id: "volatility", belt: "JUNIOR", icon: "📈", title: "Volatility & Weak Hands",
    quote: "Volatility doesn't break warriors… it BUILDS them.",
    color: "#F59E0B", glow: "rgba(245,158,11,0.4)",
    intro: "Crypto moves fast. 50% drops in hours. 10x runs overnight. The biggest losses in crypto don't come from bad projects  -  they come from panic selling at the bottom.",
    concepts: [
      { term: "Volatility", def: "The rate at which a price moves up or down. High vol = big swings both ways." },
      { term: "Weak Hands", def: "Traders who sell at the first sign of red, usually locking in losses at the worst moment." },
      { term: "Diamond Hands", def: "Holding through extreme volatility without panic selling." },
      { term: "Stop Loss", def: "A pre-set price where you automatically sell to limit downside. Discipline over emotion." },
    ],
    questions: [
      { q: "What do 'weak hands' do during a price dip?", options: ["Buy more at a discount", "Wait and analyze", "Panic sell, locking in losses", "Stake their tokens"], correct: 2, explanation: "Weak hands react emotionally. They sell the dip  -  often right before recovery. Most losses in crypto are from panic, not price." },
      { q: "What is a stop loss?", options: ["A way to stop losing friends in crypto", "A pre-set automatic sell to limit downside", "A lock on your wallet", "A fee charged by DEXs"], correct: 1, explanation: "A stop loss removes emotion from the equation. You pre-decide your exit  -  the market doesn't get to decide for you." },
      { q: "High volatility means:", options: ["The token is always going up", "Large price swings in both directions", "The project is a scam", "Low trading volume"], correct: 1, explanation: "Volatility is neutral  -  it means big moves happen. That means big gains AND big losses are both possible." },
    ],
  },
  {
    id: "wallets", belt: "SENIOR", icon: "🔐", title: "Wallets & Keys",
    quote: "Not your keys, not your coins. Cluck Norris never forgets this.",
    color: "#10B981", glow: "rgba(16,185,129,0.4)",
    intro: "Your wallet doesn't hold tokens  -  the blockchain does. Your wallet holds the KEYS that prove ownership. Lose the keys, lose everything. Forever.",
    concepts: [
      { term: "Private Key", def: "A secret string that gives full control over your wallet. Never share it. Ever." },
      { term: "Seed Phrase", def: "12-24 words that regenerate your private key. Write it on paper. Never digitally." },
      { term: "Custodial Wallet", def: "An exchange holds your keys. Convenient but risky  -  'not your keys, not your coins.'" },
      { term: "Non-Custodial Wallet", def: "You hold your own keys. Full control. Full responsibility. Phantom, Backpack, etc." },
    ],
    questions: [
      { q: "What does 'not your keys, not your coins' mean?", options: ["You need a physical key to access crypto", "If an exchange holds your keys, they control your funds", "Lost keys can be recovered by support", "Private keys are optional"], correct: 1, explanation: "When a CEX holds your keys, they actually control your funds. If they go bankrupt or freeze withdrawals  -  you have no recourse." },
      { q: "Where should you store your seed phrase?", options: ["Screenshot on your phone", "Google Drive folder", "Written on paper, stored offline", "Emailed to yourself"], correct: 2, explanation: "Seed phrases stored digitally can be hacked. Paper doesn't get hacked. Store it offline, somewhere safe." },
      { q: "What is a non-custodial wallet?", options: ["A wallet run by a bank", "A wallet where you control your own private keys", "A wallet with no fees", "A wallet locked by the government"], correct: 1, explanation: "Non-custodial means YOU hold the keys. Phantom, Backpack, and Solflare are non-custodial Solana wallets." },
    ],
  },
  {
    id: "slippage", belt: "GRADUATE", icon: "🤖", title: "Slippage & MEV",
    quote: "Cluck Norris doesn't get sandwiched. He IS the sandwich.",
    color: "#06B6D4", glow: "rgba(6,182,212,0.4)",
    intro: "Every time you swap on a DEX, bots are watching. MEV bots can see your transaction before it confirms and jump in front of it  -  paying more gas to get ahead of you, driving the price up so you buy higher. It's called a sandwich attack. Knowing this changes how you trade.",
    concepts: [
      { term: "Slippage", def: "The difference between the price you expect and the price you actually get. Happens when liquidity is low or a bot moves the price first." },
      { term: "MEV (Maximal Extractable Value)", def: "Profit bots extract by reordering, inserting, or censoring transactions within a block." },
      { term: "Sandwich Attack", def: "A bot sees your swap, buys before you (raising price), lets your trade execute at the worse price, then sells for profit. You're the filling." },
      { term: "Slippage Tolerance", def: "The max % price change you'll accept on a trade. Set too high = bot target. Set too low = transaction fails." },
    ],
    questions: [
      { q: "What is a sandwich attack?", options: ["A bot buys before and sells after your trade to profit at your expense", "A hack that drains your wallet", "A phishing attack via DMs", "When two tokens merge into one"], correct: 0, explanation: "Sandwich bots front-run your swap (buying first to raise the price), then back-run it (selling right after). You pay more, they profit. Setting tight slippage is your defense." },
      { q: "What does setting a LOW slippage tolerance do?", options: ["Makes your trade faster", "Protects you from sandwich attacks but may cause failed transactions", "Gives you a better price always", "Reduces gas fees"], correct: 1, explanation: "Low slippage = the trade only executes if the price stays close to what you expect. Bots can't profitably sandwich you, but you risk the trade failing if price moves naturally." },
      { q: "What does MEV stand for?", options: ["Maximum Exchange Value", "Maximal Extractable Value", "Market Execution Volume", "Minimum Entry Variance"], correct: 1, explanation: "MEV is profit extracted by validators or bots who control transaction ordering. On Solana it's less severe than Ethereum but still happens on high-volume DEXs." },
    ],
  },
  {
    id: "tokenomics", belt: "POST-GRAD", icon: "📊", title: "Tokenomics",
    quote: "Cluck Norris reads the whitepaper. Then he reads it again.",
    color: "#F97316", glow: "rgba(249,115,22,0.4)",
    intro: "Tokenomics is the economics of a token  -  supply, distribution, vesting, and inflation. A token with bad tokenomics will dump no matter how good the project is. This is where most retail traders get wrecked  -  they see price and ignore structure.",
    concepts: [
      { term: "Total Supply", def: "The max number of tokens that will ever exist. Fixed supply = deflationary pressure. Unlimited = inflation risk." },
      { term: "Circulating Supply", def: "How many tokens are actually in circulation and tradeable right now. This drives real market cap." },
      { term: "Vesting Schedule", def: "A lock-up period for team/investor tokens. When vesting unlocks, insiders can sell  -  watch these dates." },
      { term: "Token Distribution", def: "How tokens are split between team, investors, community, treasury. Heavy team allocation = concentrated dump risk." },
    ],
    questions: [
      { q: "Why does vesting schedule matter to traders?", options: ["It determines staking rewards", "It shows when locked team/investor tokens unlock and can be sold", "It controls gas fees", "It sets the token price at launch"], correct: 1, explanation: "When a vesting cliff hits, millions of insider tokens unlock. If team or VCs sell, price can crash hard. Always check unlock dates before entering a position." },
      { q: "A token has 1 trillion total supply and costs $0.000001. Is it cheap?", options: ["Yes, it's under a penny", "No  -  supply determines real value, not price per token", "Yes, low price means room to grow", "Can't tell without chart data"], correct: 1, explanation: "Price per token is meaningless without supply context. 1 trillion tokens at $0.000001 = $1B market cap. That's not cheap  -  that's already a large cap project at tiny price." },
      { q: "What is 'circulating supply'?", options: ["Total tokens ever created", "Tokens currently tradeable in the market", "Tokens held by the dev team", "Tokens burned forever"], correct: 1, explanation: "Circulating supply is what's actually on the market. Market cap = price × circulating supply. Low circulating supply can make a token look cheap while real valuation is already high." },
    ],
  },
  {
    id: "marketcap", belt: "TENURED", icon: "💰", title: "Market Cap vs Price",
    quote: "Price is what you pay. Market cap is what you're really buying.",
    color: "#EC4899", glow: "rgba(236,72,153,0.4)",
    intro: "The biggest beginner mistake in crypto: thinking a $0.001 token is 'cheaper' than a $50,000 BTC. Price per token means nothing. Market cap is everything. It tells you the total value of a project  -  and how much it would need to grow to hit your target return.",
    concepts: [
      { term: "Market Cap", def: "Price × Circulating Supply. The total value of a token at current price. This is the real size of a project." },
      { term: "Fully Diluted Valuation (FDV)", def: "Price × Total Supply (including locked tokens). Shows max potential market cap if all tokens were circulating." },
      { term: "Price Per Token", def: "Meaningless without supply context. A $0.001 token with 1 trillion supply has a $1B market cap." },
      { term: "Low Cap vs Large Cap", def: "Low cap tokens (<$10M) have more upside potential but far higher risk. Large caps (>$1B) are more stable but harder to 10x." },
    ],
    questions: [
      { q: "Token A: $0.001 price, 1 trillion supply. Token B: $100 price, 100,000 supply. Which has the higher market cap?", options: ["Token A  -  lower price means cheaper", "Token B  -  higher price means more valuable", "Token A  -  $1B market cap vs Token B's $10M", "They are the same"], correct: 2, explanation: "Token A: $0.001 × 1,000,000,000,000 = $1,000,000,000 (1 billion). Token B: $100 × 100,000 = $10,000,000 (10 million). Token A is 100x 'bigger' despite its tiny price." },
      { q: "What does Fully Diluted Valuation (FDV) tell you?", options: ["Current market cap only", "What the market cap would be if all tokens were in circulation", "The project's revenue", "How many people hold the token"], correct: 1, explanation: "FDV uses total supply  -  including locked, vesting, and unreleased tokens. If FDV is 10x the current market cap, there's a lot of potential sell pressure ahead as those tokens unlock." },
      { q: "For a $1M investment to 100x into $100M, what does the project's market cap need to do?", options: ["Go from any size to $100M", "Grow by $100M from its current market cap", "The market cap must also 100x", "Only the price needs to 100x"], correct: 2, explanation: "Your return is tied to market cap growth, not just price. If a project is already at $500M market cap, getting to a 100x means a $50B cap  -  that's harder than a $1M cap growing to $100M." },
    ],
  },
  {
    id: "dex", belt: "HEADMASTER", icon: "⚔️", title: "DEX vs CEX",
    quote: "CEX asks permission. DEX asks no one. Cluck Norris chooses wisely.",
    color: "#8B5CF6", glow: "rgba(139,92,246,0.4)",
    intro: "Two ways to trade crypto. CEX is the on-ramp  -  easy, regulated, ID required. DEX is the frontier  -  permissionless, self-custody, always open. Knowing when to use each is the move.",
    concepts: [
      { term: "CEX", def: "Centralized Exchange (Coinbase, Binance). Requires ID. Holds your keys. Regulated." },
      { term: "DEX", def: "Decentralized Exchange (Jupiter, Raydium). No ID. You keep your keys. Always on." },
      { term: "KYC", def: "Know Your Customer  -  identity verification required by CEXs to comply with regulations." },
      { term: "Slippage", def: "The difference between expected and actual trade price. High on illiquid pairs." },
    ],
    questions: [
      { q: "What does a CEX require that a DEX does not?", options: ["A crypto wallet", "SOL for gas fees", "Identity verification (KYC)", "A liquidity pool deposit"], correct: 2, explanation: "CEXs are regulated businesses  -  they require ID. DEXs are permissionless smart contracts. No ID, no account." },
      { q: "What is slippage on a DEX?", options: ["Accidentally sending to the wrong wallet", "The difference between expected and actual trade price", "A fee charged by the DEX team", "When your wallet disconnects mid-trade"], correct: 1, explanation: "Low liquidity = high slippage. For small-cap tokens, even a modest trade can move the price significantly." },
      { q: "Which is always available 24/7 with no downtime?", options: ["CEX  -  they have server farms", "Both are always on", "DEX  -  it's a smart contract on the blockchain", "Neither"], correct: 2, explanation: "Smart contracts don't have maintenance windows. A DEX runs as long as the blockchain does  -  which is always." },
    ],
  },
];

const BELT_BG   = { "FRESHMAN":"#F0F0F0","SOPHOMORE":"#FCD34D","JUNIOR":"#F97316","SENIOR":"#10B981","GRADUATE":"#06B6D4","POST-GRAD":"#92400E","TENURED":"#DC2626","HEADMASTER":"#111" };
const BELT_TEXT = { "FRESHMAN":"#111","SOPHOMORE":"#111","JUNIOR":"#fff","SENIOR":"#fff","GRADUATE":"#fff","POST-GRAD":"#fff","TENURED":"#fff","HEADMASTER":"#D4AF37" };
function Belt({belt,small}){return(<span style={{display:"inline-block",background:BELT_BG[belt],color:BELT_TEXT[belt],fontFamily:"'Oswald',sans-serif",fontSize:small?9:10,fontWeight:700,letterSpacing:1.5,padding:small?"2px 6px":"3px 10px",borderRadius:3,border:belt==="BLACK BELT"?"1px solid #D4AF37":"none",textTransform:"uppercase"}}>{belt}</span>);}

// ── APP ICON SVG (School of Crypto Hard Knocks) ──

function CLKNTicker() {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFees() {
      try {
        const res = await fetch(
          `${BAGS_BASE_URL}/analytics/token-lifetime-fees?tokenMint=${CLKN_MINT}`,
          { headers: { "x-api-key": BAGS_API_KEY } }
        );
        const data = await res.json();
        if (data.success) setFees(data.response);
      } catch (e) {}
      finally { setLoading(false); }
    }
    fetchFees();
    const interval = setInterval(fetchFees, 30000);
    return () => clearInterval(interval);
  }, []);

  const fmtSol = (n) => n ? parseFloat(n).toFixed(3) + " SOL" : "—";

  return (
    <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{
      display:"flex", alignItems:"center", gap:6,
      background:"rgba(217,119,6,0.1)", border:"1px solid rgba(217,119,6,0.3)",
      borderRadius:20, padding:"3px 10px", textDecoration:"none", cursor:"pointer",
    }}>
      <div style={{width:5,height:5,borderRadius:"50%",background:"#10B981",animation:"pulse 2s infinite"}}/>
      <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",letterSpacing:1}}>
        CLKN
      </span>
      {!loading && fees && (
        <span style={{fontFamily:"monospace",fontSize:9,color:"#FCD34D"}}>
          {fmtSol(fees.totalFeesSol)} earned
        </span>
      )}
      {loading && <span style={{fontSize:9,color:"#4B5563"}}>...</span>}
    </a>
  );
}

function CLKNWidget() {
  const [pool, setPool] = useState(null);
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      const headers = { "x-api-key": BAGS_API_KEY };
      const [poolRes, feesRes] = await Promise.all([
        fetch(`${BAGS_BASE_URL}/solana/bags/pools/token-mint?tokenMint=${CLKN_MINT}`, { headers }),
        fetch(`${BAGS_BASE_URL}/analytics/token-lifetime-fees?tokenMint=${CLKN_MINT}`, { headers }),
      ]);
      const [poolData, feesData] = await Promise.all([poolRes.json(), feesRes.json()]);
      if (poolData.success) setPool(poolData.response);
      if (feesData.success) setFees(feesData.response);
      setLastUpdated(new Date());
    } catch (e) {}
    finally { setLoading(false); }
  }

  useEffect(() => { fetchData(); const i = setInterval(fetchData, 30000); return () => clearInterval(i); }, []);

  const fmtSol = (n) => n ? parseFloat(n).toLocaleString(undefined,{maximumFractionDigits:3}) + " SOL" : "—";
  const shortKey = (k) => k ? `${k.slice(0,6)}...${k.slice(-4)}` : "Not active";

  return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:4,color:"#D97706",marginBottom:4}}>LIVE TOKEN DATA</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:26,color:"#F9FAFB",margin:0}}>CLKN on Bags.fm</h2>
      </div>

      {/* Fee Stats */}
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 0 20px rgba(217,119,6,0.08)"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:"#D97706",marginBottom:12}}>📊 LIFETIME FEES</div>
        {fees ? (
          <div style={{display:"flex",gap:8}}>
            {[
              {label:"Total Earned",value:fmtSol(fees.totalFeesSol),color:"#FCD34D"},
              {label:"Claimed",value:fmtSol(fees.claimedFeesSol),color:"#10B981"},
              {label:"Unclaimed",value:fmtSol(fees.unclaimedFeesSol),color:"#F59E0B"},
            ].map(s=>(
              <div key={s.label} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:8,letterSpacing:2,color:"#6B7280",marginBottom:4}}>{s.label}</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:s.color}}>{s.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{height:60,background:"rgba(255,255,255,0.03)",borderRadius:10,animation:"pulse 1.5s infinite"}}/>
        )}
      </div>

      {/* Pool Info */}
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:"#D97706",marginBottom:12}}>🏊 POOL DATA</div>
        {pool ? (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {[
              {label:"TOKEN MINT",value:shortKey(CLKN_MINT),color:"#06B6D4"},
              {label:"DBC POOL",value:shortKey(pool.dbcPoolKey),color:"#D97706"},
              {label:"DAMM V2",value:shortKey(pool.dammV2PoolKey),color:"#8B5CF6"},
            ].map(r=>(
              <div key={r.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:2,color:"#4B5563"}}>{r.label}</span>
                <span style={{fontFamily:"monospace",fontSize:11,color:r.color}}>{r.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{height:80,background:"rgba(255,255,255,0.03)",borderRadius:10,animation:"pulse 1.5s infinite"}}/>
        )}
      </div>

      {/* Trade Button */}
      <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{
        display:"block",width:"100%",background:"linear-gradient(135deg,#D97706,#EF4444)",
        border:"none",borderRadius:10,padding:"14px",
        fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,
        color:"#fff",letterSpacing:3,textDecoration:"none",textAlign:"center",
        boxShadow:"0 0 28px rgba(217,119,6,0.5)",marginBottom:10,
      }}>
        🔥 TRADE CLKN ON BAGS.FM
      </a>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 4px"}}>
        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563",letterSpacing:1}}>
          {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : ""}
        </span>
        <button onClick={fetchData} style={{background:"none",border:"none",color:"#D97706",fontFamily:"'Oswald',sans-serif",fontSize:8,letterSpacing:2,cursor:"pointer"}}>
          ↻ REFRESH
        </button>
        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563",letterSpacing:1}}>ref: firechicken007</span>
      </div>
    </div>
  );
}

function AppIcon({size=64}){
  return(
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <radialGradient id="fire" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D"/>
          <stop offset="100%" stopColor="#D97706"/>
        </linearGradient>
        <linearGradient id="belt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1F1F1F"/>
          <stop offset="45%" stopColor="#D4AF37"/>
          <stop offset="55%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#1F1F1F"/>
        </linearGradient>
      </defs>
      {/* background circle */}
      <circle cx="60" cy="60" r="58" fill="url(#bg)" stroke="#D97706" strokeWidth="2"/>
      {/* fire glow */}
      <circle cx="60" cy="60" r="50" fill="url(#fire)"/>
      {/* mortarboard hat */}
      <rect x="32" y="44" width="56" height="8" rx="2" fill="url(#gold)"/>
      <polygon points="60,28 88,44 60,44 32,44" fill="#1a1a1a" stroke="#D97706" strokeWidth="1.5"/>
      <polygon points="60,28 88,44 60,44 32,44" fill="#2a2a2a"/>
      <rect x="58" y="28" width="4" height="4" rx="1" fill="url(#gold)"/>
      {/* tassel */}
      <line x1="88" y1="44" x2="92" y2="52" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="92" cy="54" r="3" fill="#D4AF37"/>
      <line x1="92" y1="57" x2="90" y2="63" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="92" y1="57" x2="92" y2="64" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="92" y1="57" x2="94" y2="63" stroke="#D4AF37" strokeWidth="1"/>
      {/* black belt stripe */}
      <rect x="20" y="70" width="80" height="9" rx="4" fill="url(#belt)"/>
      {/* fist left */}
      <ellipse cx="34" cy="75" rx="10" ry="8" fill="#D4AF37" opacity="0.15"/>
      <text x="28" y="79" fontSize="14" fill="#D97706">✊</text>
      {/* fist right */}
      <ellipse cx="86" cy="75" rx="10" ry="8" fill="#D4AF37" opacity="0.15"/>
      <text x="78" y="79" fontSize="14" fill="#D97706">✊</text>
      {/* CLKN text */}
      <text x="60" y="100" textAnchor="middle" fontFamily="'Oswald',sans-serif" fontSize="11" fontWeight="900" fill="url(#gold)" letterSpacing="3">CLKN</text>
      <text x="60" y="112" textAnchor="middle" fontFamily="'Oswald',sans-serif" fontSize="6" fill="#6B7280" letterSpacing="2">SCHOOL</text>
    </svg>
  );
}

function Landing({onStart,completed}){
  const pct=Math.round((completed.length/LESSONS.length)*100);
  return(
    <div style={{textAlign:"center",padding:"0 20px 40px",maxWidth:520,margin:"0 auto"}}>
      {/* logo */}
      <div style={{position:"relative",display:"inline-block",marginBottom:6}}>
        <div style={{position:"absolute",inset:-16,background:"radial-gradient(circle,rgba(217,119,6,.25) 0%,transparent 70%)",borderRadius:"50%"}}/>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:200,height:200,objectFit:"cover",borderRadius:"50%",border:"3px solid #D97706",position:"relative",zIndex:1,filter:"drop-shadow(0 0 20px rgba(217,119,6,0.6))"}}/>
      </div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:6,color:"#D97706",marginBottom:4}}>SCHOOL OF</div>
      <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:34,fontWeight:900,margin:"0 0 2px",background:"linear-gradient(135deg,#FCD34D,#F97316,#EF4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textTransform:"uppercase",letterSpacing:1,lineHeight:1}}>Crypto Hard Knocks</h1>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:4,marginBottom:18}}>POWERED BY CLKN</div>
      <p style={{color:"#9CA3AF",fontSize:14,lineHeight:1.7,marginBottom:22,fontStyle:"italic"}}>"No participation trophies. No hand-holding. Just hard knocks."</p>
      {completed.length>0&&(
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"12px 16px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#6B7280",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:6}}><span>TRANSCRIPT</span><span>{completed.length}/{LESSONS.length} CLASSES PASSED</span></div>
          <div style={{height:5,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#F97316,#FCD34D)",borderRadius:3}}/></div>
          <div style={{marginTop:8,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {LESSONS.map(l=><span key={l.id} style={{fontSize:10,color:completed.includes(l.id)?"#FCD34D":"#4B5563",fontFamily:"'Oswald',sans-serif"}}>{completed.includes(l.id)?"✓":"○"} {l.title.split(" ")[0]}</span>)}
          </div>
        </div>
      )}
      <button onClick={onStart} style={{background:"linear-gradient(135deg,#D97706,#EF4444)",border:"none",borderRadius:10,padding:"14px 44px",fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:"#fff",letterSpacing:3,textTransform:"uppercase",cursor:"pointer",boxShadow:"0 0 28px rgba(217,119,6,0.5)"}}>
        {completed.length===0?"📋 Enroll Now":"📚 Back to Class"}
      </button>
      <p style={{marginTop:12,fontSize:10,color:"#4B5563",fontFamily:"'Oswald',sans-serif",letterSpacing:1}}>8 CLASSES • 24 EXAMS • NO EXTRA CREDIT</p>
      <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{
        display:"inline-block",marginTop:16,
        background:"rgba(217,119,6,0.1)",border:"1px solid rgba(217,119,6,0.35)",
        borderRadius:10,padding:"12px 32px",
        fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,
        color:"#D97706",letterSpacing:3,textDecoration:"none",
        boxShadow:"0 0 16px rgba(217,119,6,0.2)",
      }}>
        🔥 TRADE CLKN ON BAGS.FM
      </a>
    </div>
  );
}

function Select({onSelect,completed}){
  return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:80,height:80,objectFit:"cover",borderRadius:"50%",border:"2px solid #D97706",filter:"drop-shadow(0 0 12px rgba(217,119,6,0.5))",marginBottom:8}}/>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:4,color:"#D97706",marginBottom:4}}>PICK YOUR POISON</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:26,color:"#F9FAFB",margin:0}}>The Schoolyard</h2>
      </div>
      <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"rgba(217,119,6,0.1)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:10,padding:"10px",marginBottom:16,textDecoration:"none"}}>
        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#D97706",letterSpacing:2}}>🔥 TRADE CLKN ON BAGS.FM</span>
        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#6B7280",letterSpacing:1}}>ref: firechicken007</span>
      </a>
      <div style={{display:"none"}}>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {LESSONS.map((l,i)=>{
          const done=completed.includes(l.id);
          const locked=i>0&&!completed.includes(LESSONS[i-1].id);
          return(
            <button key={l.id} onClick={()=>!locked&&onSelect(l.id)} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${done?l.color:locked?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.1)"}`,borderRadius:12,padding:"14px 18px",cursor:locked?"not-allowed":"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14,opacity:locked?0.4:1,boxShadow:done?`0 0 16px ${l.glow}`:"none"}}>
              <div style={{fontSize:24,minWidth:36,textAlign:"center"}}>{done?"✅":locked?"🔒":l.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontFamily:"'Oswald',sans-serif",fontSize:15,color:"#F9FAFB",fontWeight:600}}>{l.title}</span>
                  <Belt belt={l.belt} small/>
                </div>
                <div style={{fontSize:11,color:"#6B7280",fontStyle:"italic"}}>"{l.quote.split("…")[0]}…"</div>
              </div>
              {!locked&&<div style={{color:l.color,fontSize:16}}>→</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Lesson({lesson:l,onComplete,onBack}){
  const [phase,setPhase]=useState("intro");
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [answers,setAnswers]=useState([]);
  const [finalScore,setFinalScore]=useState(0);
  const [showExp,setShowExp]=useState(false);
  const q=l.questions[qi];
  function pick(i){if(sel!==null)return;setSel(i);setShowExp(true);}
  function next(){
    const a=[...answers,sel===q.correct];
    setAnswers(a);
    if(qi+1<l.questions.length){setQi(qi+1);setSel(null);setShowExp(false);}
    else{setFinalScore(a.filter(Boolean).length);setPhase("result");}
  }
  function retry(){setPhase("intro");setQi(0);setSel(null);setAnswers([]);setFinalScore(0);setShowExp(false);}
  const score=phase==="result"?finalScore:answers.filter(Boolean).length;
  const passed=score>=2;

  if(phase==="intro") return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,marginBottom:18,padding:0}}>← BACK</button>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:40,marginBottom:6}}>{l.icon}</div>
        <Belt belt={l.belt}/>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,color:"#F9FAFB",margin:"8px 0 4px"}}>{l.title}</h2>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:l.color,fontSize:14,margin:0,lineHeight:1.5}}>"{l.quote}"</p>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:16,marginBottom:16}}>
        <p style={{color:"#D1D5DB",fontSize:14,lineHeight:1.7,margin:0}}>{l.intro}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
        {l.concepts.map((c,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.02)",borderLeft:`3px solid ${l.color}`,borderRadius:8,padding:"10px 14px"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:l.color,letterSpacing:1,marginBottom:3}}>{c.term}</div>
            <div style={{fontSize:12,color:"#9CA3AF",lineHeight:1.5}}>{c.def}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setPhase("quiz")} style={{width:"100%",background:l.color,border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer",boxShadow:`0 0 20px ${l.glow}`}}>
        📚 HIT THE BOOKS
      </button>
    </div>
  );

  if(phase==="quiz") return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#6B7280",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:5}}>
          <span>{l.title.toUpperCase()}</span><span>EXAM {qi+1} OF {l.questions.length}</span>
        </div>
        <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2}}>
          <div style={{height:"100%",width:`${(qi/l.questions.length)*100}%`,background:l.color,borderRadius:2}}/>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:20,marginBottom:14}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:l.color,letterSpacing:2,marginBottom:8}}>EXAM QUESTION {qi+1}</div>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:"#F9FAFB",margin:0,lineHeight:1.4}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {q.options.map((opt,i)=>{
          let bg="rgba(255,255,255,0.03)",border="1px solid rgba(255,255,255,0.08)",color="#D1D5DB";
          if(sel!==null){
            if(i===q.correct){bg="rgba(16,185,129,0.15)";border="1px solid #10B981";color="#10B981";}
            else if(i===sel){bg="rgba(239,68,68,0.15)";border="1px solid #EF4444";color="#EF4444";}
          }
          return(<button key={i} onClick={()=>pick(i)} style={{background:bg,border,borderRadius:10,padding:"12px 14px",color,cursor:sel!==null?"default":"pointer",textAlign:"left",fontSize:14,display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:11,opacity:0.6,minWidth:18}}>{String.fromCharCode(65+i)}</span>{opt}
          </button>);
        })}
      </div>
      {showExp&&(<>
        <div style={{background:sel===q.correct?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${sel===q.correct?"#10B981":"#EF4444"}`,borderRadius:10,padding:14,marginBottom:12}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:1,color:sel===q.correct?"#10B981":"#EF4444",marginBottom:5}}>{sel===q.correct?"✓ CORRECT  -  PROFESSOR NORRIS NOTES:":"✗ WRONG  -  PROFESSOR NORRIS CORRECTS YOU:"}</div>
          <p style={{margin:0,color:"#D1D5DB",fontSize:13,lineHeight:1.6}}>{q.explanation}</p>
        </div>
        <button onClick={next} style={{width:"100%",background:l.color,border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer"}}>
          {qi+1<l.questions.length?"NEXT EXAM →":"SEE REPORT CARD →"}
        </button>
      </>)}
    </div>
  );

  return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:12}}>{passed?"🏆":"💀"}</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:4,color:passed?"#10B981":"#EF4444",marginBottom:6}}>{passed?"CLASS PASSED":"DETENTION"}</div>
      <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:30,color:"#F9FAFB",margin:"0 0 8px"}}>{score}/{l.questions.length} Correct</h2>
      <Belt belt={l.belt}/>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:18,margin:"20px 0",textAlign:"left"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,color:l.color,marginBottom:6}}>PROFESSOR NORRIS REMARKS:</div>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:"#D1D5DB",fontSize:15,margin:0,lineHeight:1.6}}>
          {passed?`"${l.quote} Now you know why."`:`"This school has no participation trophies. Hit the books. Try again."`}
        </p>
      </div>
      <div style={{display:"flex",gap:10}}>
        {!passed&&<button onClick={retry} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D1D5DB",cursor:"pointer",letterSpacing:2}}>↩ RETAKE</button>}
        <button onClick={()=>onComplete(l.id,passed)} style={{flex:2,background:passed?`linear-gradient(135deg,${l.color},#D97706)`:"rgba(239,68,68,0.2)",border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",letterSpacing:2,boxShadow:passed?`0 0 20px ${l.glow}`:"none"}}>
          {passed?"NEXT CLASS →":"BACK TO SCHOOLYARD"}
        </button>
      </div>
    </div>
  );
}

function Complete({onRestart}){
  return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
      <div style={{position:"relative",display:"inline-block",marginBottom:12}}>
        <div style={{position:"absolute",inset:-24,background:"radial-gradient(circle,rgba(217,119,6,.4) 0%,transparent 70%)",borderRadius:"50%",animation:"pulse 2s infinite"}}/>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:150,height:150,objectFit:"cover",borderRadius:"50%",border:"3px solid #D97706",position:"relative",zIndex:1,filter:"drop-shadow(0 0 30px rgba(217,119,6,0.8))"}}/>
      </div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:6,color:"#D97706",marginBottom:6}}>GRADUATED. FEW MAKE IT.</div>
      <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:34,fontWeight:900,background:"linear-gradient(135deg,#FCD34D,#F97316)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 6px"}}>HEADMASTER CERTIFIED</h1>
      <div style={{fontSize:24,margin:"8px 0 16px"}}>🎓📜🏆</div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:12,padding:18,marginBottom:24,boxShadow:"0 0 28px rgba(217,119,6,0.2)"}}>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:16,margin:"0 0 10px",lineHeight:1.5}}>"You graduated from the Hard Knocks. Most dropped out. The blockchain remembers those who stayed."</p>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:2}}> -  PROFESSOR NORRIS</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:24}}>
        {[["8","CLASSES"],["24","EXAMS"],["0","EXTRA CREDIT"]].map(([n,lb])=>(
          <div key={lb} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 6px",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,color:"#FCD34D"}}>{n}</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:8,letterSpacing:2,color:"#6B7280"}}>{lb}</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(217,119,6,0.08)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:10,padding:12,marginBottom:20}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,color:"#D97706",marginBottom:4}}>JOIN THE ECOSYSTEM</div>
        <p style={{margin:0,fontSize:12,color:"#9CA3AF"}}>Trade CLKN on Bags.fm • Powered by Solana</p>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{flex:1,background:"linear-gradient(135deg,#D97706,#EF4444)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:2,textDecoration:"none",textAlign:"center",boxShadow:"0 0 20px rgba(217,119,6,0.4)"}}>
          🔥 TRADE CLKN
        </a>
        <button onClick={onRestart} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D1D5DB",cursor:"pointer",letterSpacing:2}}>
          🔄 REPEAT THE YEAR
        </button>
      </div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [lessonId,setLessonId]=useState(null);
  const [completed,setCompleted]=useState([]);
  const lesson=LESSONS.find(l=>l.id===lessonId);

  function finish(id,passed){
    if(passed&&!completed.includes(id)){
      const next=[...completed,id];
      setCompleted(next);
      if(next.length===LESSONS.length){setScreen("complete");return;}
    }
    setScreen("select");
  }

  return(
    <div style={{minHeight:"100vh",background:"#0C0C0C",backgroundImage:"radial-gradient(ellipse at 20% 10%,rgba(217,119,6,.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 90%,rgba(239,68,68,.06) 0%,transparent 50%)",color:"#F9FAFB"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;900&display=swap');
        @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        *{box-sizing:border-box} button{transition:all .15s ease}
      `}</style>
      {/* Header */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)",padding:"10px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div onClick={()=>setScreen("landing")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
          <AppIcon size={28}/>
          <div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,fontWeight:700,letterSpacing:2,color:"#D97706",lineHeight:1}}>CLUCK NORRIS</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:7,color:"#6B7280",letterSpacing:1.5,lineHeight:1}}>SCHOOL OF CRYPTO HARD KNOCKS</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5}}>
          {LESSONS.map(l=><div key={l.id} style={{width:7,height:7,borderRadius:"50%",background:completed.includes(l.id)?l.color:"rgba(255,255,255,0.1)"}}/>)}
        </div>
        <CLKNTicker/>
      </div>
      <div style={{paddingTop:28}}>
        {screen==="landing"&&<Landing onStart={()=>setScreen("select")} completed={completed}/>}
        {screen==="clkn"&&<CLKNWidget/>}
        {screen==="select"&&<Select onSelect={id=>{setLessonId(id);setScreen("lesson");}} completed={completed}/>}
        {screen==="lesson"&&lesson&&<Lesson lesson={lesson} onComplete={finish} onBack={()=>setScreen("select")}/>}
        {screen==="complete"&&<Complete onRestart={()=>{setCompleted([]);setScreen("landing");}}/>}
      </div>
    </div>
  );
}
