import argparse
import re


parser = argparse.ArgumentParser(
    description='Get a new version for demonware core packages.')
parser.add_argument('-p','--package', help='Package name', required=True)
parser.add_argument('tag', nargs='?', help='Current tag')
parser.add_argument(
    '--patch', dest='patch', action='store_true',
    help='Creates a new version by incrementing the patch number of the '
         'current version.')
parser.add_argument(
    '--minor', dest='minor', action='store_true',
    help='Creates a new version by incrementing the minor number of the '
         'current version.')
parser.add_argument(
    '--major', dest='major', action='store_true',
    help='Creates a new version by incrementing the major number of the '
    'current version.')
parser.add_argument(
    '--numbers-only', dest='numbers_only', action='store_true',
    help='Prints only version numbers.')

def parse_version(package, tag):
    version_regex = re.compile(r'^%s-(\d+)\.(\d+)\.(\d+).*$' % re.escape(package))
    m = version_regex.match(tag)
    if not m:
        return (0, 0, 0)
    v = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return v


def main():
    args = parser.parse_args()
    new_version = parse_version(args.package, args.tag)
    if args.major:
        new_version = (new_version[0] + 1, 0, 0)
    elif args.minor:
        new_version = (new_version[0], new_version[1] + 1, 0)
    elif args.patch:
        new_version = (new_version[0], new_version[1], new_version[2] + 1)

    if args.numbers_only:
        print('{}.{}.{}'.format(*new_version))
    else:
        print('{}-{}.{}.{}'.format(args.package, *new_version))


if __name__ == "__main__":
    main()
