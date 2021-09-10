using System.Threading;
using System.Threading.Tasks;
using Application.Activities.Profiles;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Activities.Profiles.Profile>>
        {
            public string Username { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<Activities.Profiles.Profile>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Activities.Profiles.Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user= await _context.Users
                .ProjectTo<Activities.Profiles.Profile>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x=> x.Username == request.Username);
                return Result<Activities.Profiles.Profile>.Success(user);
            }
        }

    }
}